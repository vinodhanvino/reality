# Data Structures — Reference

## 1. Complexity Master Table

| Structure | Access | Search | Insert | Delete | Space | Notes |
|---|---|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) | Best cache locality |
| Dynamic Array | O(1) | O(n) | O(1)* | O(n) | O(n) | *amortised |
| Linked List | O(n) | O(n) | O(1) | O(1) | O(n) | Poor cache |
| Stack | O(n) | O(n) | O(1) | O(1) | O(n) | LIFO |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) | FIFO |
| Hash Map | O(1)* | O(1)* | O(1)* | O(1)* | O(n) | *avg, O(n) worst |
| BST | O(log n) | O(log n) | O(log n) | O(log n) | O(n) | Unbalanced → O(n) |
| AVL / Red-Black | O(log n) | O(log n) | O(log n) | O(log n) | O(n) | Balanced guaranteed |
| Heap (Binary) | O(1) min/max | O(n) | O(log n) | O(log n) | O(n) | Priority queue |
| Trie | — | O(m) | O(m) | O(m) | O(n·m) | m = key length |
| Segment Tree | — | O(log n) | O(log n) | O(log n) | O(n) | Range queries |
| Union-Find | — | O(α n) | O(α n) | — | O(n) | α ≈ constant |
| Skip List | O(log n) | O(log n) | O(log n) | O(log n) | O(n log n) | Probabilistic |

---

## 2. Linear Structures

### Stack — LIFO

```python
class Stack:
    """O(1) push/pop — backed by dynamic array"""
    def __init__(self):
        self._data = []

    def push(self, val):        self._data.append(val)
    def pop(self):              return self._data.pop()
    def peek(self):             return self._data[-1]
    def is_empty(self):         return len(self._data) == 0
    def __len__(self):          return len(self._data)

# ── Use cases ──────────────────────────────────────────────
# Balanced parentheses, undo/redo, DFS iterative,
# expression evaluation, call stack simulation
```

### Queue — FIFO

```python
from collections import deque

class Queue:
    """O(1) enqueue/dequeue — deque avoids O(n) list.pop(0)"""
    def __init__(self):
        self._data = deque()

    def enqueue(self, val):     self._data.append(val)
    def dequeue(self):          return self._data.popleft()
    def peek(self):             return self._data[0]
    def is_empty(self):         return len(self._data) == 0

# ── Use cases ──────────────────────────────────────────────
# BFS, task scheduling, sliding window, rate limiting
```

### Monotonic Stack / Queue

```python
from collections import deque

def next_greater(arr):
    """Next greater element for each index — O(n)"""
    result = [-1] * len(arr)
    stack  = []                        # stores indices
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] < val:
            result[stack.pop()] = val
        stack.append(i)
    return result

def sliding_window_max(arr, k):
    """Max in every window of size k — O(n)"""
    dq     = deque()                   # monotonic decreasing deque of indices
    result = []
    for i, val in enumerate(arr):
        while dq and arr[dq[-1]] < val:
            dq.pop()
        dq.append(i)
        if dq[0] == i - k:
            dq.popleft()
        if i >= k - 1:
            result.append(arr[dq[0]])
    return result
```

---

## 3. Hash Structures

### Hash Map from Scratch

```python
class HashMap:
    """Separate chaining hash map"""
    def __init__(self, capacity=16, load_factor=0.75):
        self.capacity    = capacity
        self.load_factor = load_factor
        self.size        = 0
        self.buckets     = [[] for _ in range(capacity)]

    def _hash(self, key):
        return hash(key) % self.capacity

    def put(self, key, value):
        idx    = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self.size += 1
        if self.size / self.capacity > self.load_factor:
            self._resize()

    def get(self, key, default=None):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return default

    def _resize(self):
        old = self.buckets
        self.capacity *= 2
        self.buckets   = [[] for _ in range(self.capacity)]
        self.size      = 0
        for bucket in old:
            for k, v in bucket:
                self.put(k, v)
```

### Python Built-in Patterns

```python
from collections import defaultdict, Counter, OrderedDict

# Frequency count
freq = Counter("aabbccaaa")                  # Counter({'a': 5, 'b': 2, 'c': 2})
top2 = freq.most_common(2)

# Group by
groups = defaultdict(list)
for word in ["cat", "car", "bat", "bar"]:
    groups[word[0]].append(word)
# {'c': ['cat', 'car'], 'b': ['bat', 'bar']}

# LRU Cache pattern
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)
```

---

## 4. Trees

### Binary Search Tree

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class TreeNode:
    val:   int
    left:  Optional["TreeNode"] = None
    right: Optional["TreeNode"] = None

class BST:
    def __init__(self):         self.root = None

    def insert(self, val):      self.root = self._insert(self.root, val)
    def search(self, val):      return self._search(self.root, val)
    def inorder(self):          return self._inorder(self.root, [])

    def _insert(self, node, val):
        if not node: return TreeNode(val)
        if val < node.val:  node.left  = self._insert(node.left, val)
        elif val > node.val: node.right = self._insert(node.right, val)
        return node

    def _search(self, node, val):
        if not node or node.val == val: return node
        return self._search(node.left if val < node.val else node.right, val)

    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.val)
            self._inorder(node.right, result)
        return result
```

### Heap (Priority Queue)

```python
import heapq

# ── Min-heap ───────────────────────────────────────────────
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)
print(heapq.heappop(heap))   # 1 (smallest)

# ── Max-heap — negate values ───────────────────────────────
max_heap = []
for val in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -val)
print(-heapq.heappop(max_heap))  # 5 (largest)

# ── K largest elements — O(n log k) ───────────────────────
def k_largest(nums, k):
    return heapq.nlargest(k, nums)

# ── Merge K sorted lists ───────────────────────────────────
def merge_k_sorted(lists):
    heap   = []
    result = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    while heap:
        val, i, j = heapq.heappop(heap)
        result.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(heap, (lists[i][j+1], i, j+1))
    return result
```

### Trie (Prefix Tree)

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end   = False

class Trie:
    """O(m) insert/search — m = word length. Best for prefix matching."""
    def __init__(self):     self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.is_end = True

    def search(self, word):
        node = self._traverse(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._traverse(prefix) is not None

    def _traverse(self, s):
        node = self.root
        for ch in s:
            if ch not in node.children: return None
            node = node.children[ch]
        return node
```

---

## 5. Graphs

### Representations

```python
from collections import defaultdict

# ── Adjacency List (sparse graphs — recommended) ────────────
graph = defaultdict(list)
graph[0].append((1, 4))    # node 0 → node 1, weight 4
graph[0].append((2, 1))
graph[1].append((3, 1))

# ── Adjacency Matrix (dense graphs / O(1) edge lookup) ─────
n = 5
matrix = [[0]*n for _ in range(n)]
matrix[0][1] = 4
matrix[0][2] = 1
```

### Segment Tree — Range Queries

```python
class SegmentTree:
    """Range sum query + point update — O(log n) both ops"""
    def __init__(self, nums):
        self.n    = len(nums)
        self.tree = [0] * (2 * self.n)
        for i, v in enumerate(nums):
            self.tree[self.n + i] = v
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2*i] + self.tree[2*i+1]

    def update(self, i, val):
        i += self.n
        self.tree[i] = val
        while i > 1:
            i //= 2
            self.tree[i] = self.tree[2*i] + self.tree[2*i+1]

    def query(self, l, r):              # sum [l, r) — half-open
        res, l, r = 0, l + self.n, r + self.n
        while l < r:
            if l & 1: res += self.tree[l]; l += 1
            if r & 1: r  -= 1;            res += self.tree[r]
            l //= 2; r //= 2
        return res
```

### Union-Find (Disjoint Set)

```python
class UnionFind:
    """Near O(1) union/find with path compression + rank — α(n) ≈ constant"""
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank   = [0] * n
        self.count  = n               # number of connected components

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])   # path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        self.count -= 1
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

---

## 6. Bloom Filter (Probabilistic)

```python
import mmh3
from bitarray import bitarray

class BloomFilter:
    """Space-efficient probabilistic set. No false negatives, rare false positives."""
    def __init__(self, capacity=1_000_000, error_rate=0.01):
        import math
        self.m    = int(-capacity * math.log(error_rate) / math.log(2)**2)
        self.k    = int(self.m / capacity * math.log(2))
        self.bits = bitarray(self.m)
        self.bits.setall(0)

    def add(self, item):
        for seed in range(self.k):
            self.bits[mmh3.hash(item, seed) % self.m] = 1

    def __contains__(self, item):
        return all(self.bits[mmh3.hash(item, s) % self.m] for s in range(self.k))

# Use case: check if voter ID already processed — saves LMDB lookup
```

---

## 7. Structure Selection Guide

```
Need fast lookup by key?              → Hash Map  O(1)
Need ordered iteration + lookup?      → BST / SortedList  O(log n)
Need min or max repeatedly?           → Heap  O(log n)
Need prefix search on strings?        → Trie  O(m)
Need range sum/min/max queries?       → Segment Tree  O(log n)
Need connected components?            → Union-Find  O(α n)
Need LIFO (undo / DFS)?               → Stack  O(1)
Need FIFO (BFS / scheduling)?         → Queue / deque  O(1)
Need probabilistic membership test?   → Bloom Filter  O(k)
Need sliding window extremes?         → Monotonic Deque  O(n)
Need LRU eviction?                    → OrderedDict / functools.lru_cache
```

---

## 8. Interview Patterns Cheat Sheet

```
Two Pointers         → sorted array, pair sum, palindrome
Sliding Window       → substring, subarray with constraint
Fast & Slow Pointer  → cycle detection, middle of list
Monotonic Stack      → next greater/smaller element
Top-K Elements       → heap of size k
Merge Intervals      → sort by start, greedy merge
Prefix Sum           → subarray sum queries in O(1)
Trie                 → autocomplete, word search
Union-Find           → connected components, Kruskal MST
Segment Tree         → range query + point update
```

> "Data structures are the nouns of programming. Algorithms are the verbs." — Unknown