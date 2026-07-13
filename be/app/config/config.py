from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Get the directory where config.py is located (app/)
# Then go up one level to the project root where .env lives
current_dir = Path(__file__).parent
env_path = current_dir.parent.parent / ".env"


class Settings(BaseSettings):
    API_KEY: str = ''
    DB_PROD_URL: str = ''
    DB_AUTO_CREATE_SCHEMA: bool = True

    AUTH_SESSION_TTL_MINUTES: int = 40
    AUTH_SIGNUP_ACTIVE_DEFAULT: bool = True
    AUTH_SIGNUP_PASSWORD_MIN_LENGTH: int = 8

    PROJECT_NAME_MAX_LENGTH: int = 200
    PROJECT_DESCRIPTION_MAX_LENGTH: int = 4000

    OUTLET_NAME_MAX_LENGTH: int = 200
    OUTLET_DESCRIPTION_MAX_LENGTH: int = 4000

    # Role name that may assign project membership to other users (env-overridable).
    ROLE_AUDITOR: str = "Auditor"

    model_config = SettingsConfigDict(
        env_file=env_path,  # Use the absolute path calculated above
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
