from __future__ import annotations

import time
import uuid
from typing import Optional, Protocol

class SessionStore(Protocol):
    async def create_session(self, user_id: int) -> tuple[str, int]: ...
    async def validate_token(self, token: str) -> Optional[int]: ...
    async def close(self) -> None: ...


class MemorySessionStore:
    def __init__(self, ttl_minutes: int) -> None:
        self._ttl_minutes = max(1, ttl_minutes)
        self._ttl_sec = self._ttl_minutes * 60
        self._by_token: dict[str, tuple[int, float]] = {}
        self._user_token: dict[int, str] = {}

    async def create_session(self, user_id: int) -> tuple[str, int]:
        old = self._user_token.pop(user_id, None)
        if old:
            self._by_token.pop(old, None)
        token = str(uuid.uuid4())
        exp = time.monotonic() + self._ttl_sec
        self._by_token[token] = (user_id, exp)
        self._user_token[user_id] = token
        return token, self._ttl_minutes

    async def validate_token(self, token: str) -> Optional[int]:
        rec = self._by_token.get(token)
        if not rec:
            return None
        uid, exp = rec
        if exp <= time.monotonic():
            self._by_token.pop(token, None)
            if self._user_token.get(uid) == token:
                del self._user_token[uid]
            return None
        return uid

    async def close(self) -> None:
        self._by_token.clear()
        self._user_token.clear()


_store: Optional[SessionStore] = None


def get_session_store() -> SessionStore:
    if _store is None:
        raise RuntimeError('Session store not initialized')
    return _store


async def init_session_store(store: SessionStore) -> None:
    global _store
    _store = store


async def shutdown_session_store() -> None:
    global _store
    if _store is not None:
        await _store.close()
        _store = None
