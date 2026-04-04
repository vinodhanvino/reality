# Algorithms Expert — Reference

## 1. Complexity Quick Reference

### Time Complexity Ladder

```
O(1)        → Hash lookup, array index, stack push
O(log n)    → Binary search, heap ops, balanced BST
O(n)        → Linear scan, BFS/DFS, two pointers
O(n log n)  → Merge sort, heap sort, most sorting
O(n²)       → Bubble/insertion/selection sort, naive DP
O(n³)       → Floyd-Warshall, naive matrix multiply
O(2ⁿ)       → Subset enumeration, brute-force combinatorics
O(n!)       → Permutation generation, TSP brute force
```

### Input Size → Target Complexity

| n | Max Acceptable Complexity |
|---|---|
| n ≤ 10 | O(n!) |
| n ≤ 20 | O(2ⁿ) |
| n ≤ 100 | O(n³) |
| n ≤ 1,000 | O(n²) |
| n ≤ 100,000 | O(n log n) |
| n ≤ 10,000,000 | O(n) |
| n > 10,000,000 | O(log n) or O(1) |

---

## 2. Sorting Algorithms

```python
# ── Merge Sort — O(n log n), stable ───────────────────────
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid   = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i += 1
        else:                    result.append(right[j]); j += 1
    return result + left[i:] + right[j:]


# ── Quick Sort — O(n log n) avg, O(n²) worst ───────────────
def quick_sort(arr, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo < hi:
        p = partition(arr, lo, hi)
        quick_sort(arr, lo, p - 1)
        quick_sort(arr, p + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i     = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1


# ── Counting Sort — O(n + k), non-comparison ───────────────
def counting_sort(arr, max_val):
    count = [0] * (max_val + 1)
    for x in arr: count[x] += 1
    result = []
    for val, freq in enumerate(count):
        result.extend([val] * freq)
    return result


# ── Tim Sort (Python default) — O(n log n), adaptive ───────
arr = [3, 1, 4, 1, 5, 9, 2, 6]
arr.sort()                         # stable, in-place
arr.sort(key=lambda x: -x)        # descending
pairs.sort(key=lambda p: (p[0], -p[1]))   # multi-key
```

### Sorting Selection Guide

| Need | Use |
|---|---|
| General purpose | `list.sort()` Tim Sort |
| External / large data | Merge Sort |
| Nearly sorted data | Insertion Sort |
| Integer keys in small range | Counting / Radix Sort |
| Guaranteed O(n log n) worst | Heap Sort |
| Custom comparator | `sorted(arr, key=...)` |

---

## 3. Searching

```python
# ── Binary Search — O(log n) ───────────────────────────────
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   arr[mid] == target: return mid
        elif arr[mid] <  target: lo = mid + 1
        else:                    hi = mid - 1
    return -1

# ── Left boundary (first occurrence) ──────────────────────
def bisect_left(arr, target):
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < target: lo = mid + 1
        else:                  hi = mid
    return lo

# ── Right boundary (last occurrence) ──────────────────────
def bisect_right(arr, target):
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] <= target: lo = mid + 1
        else:                   hi = mid
    return lo - 1

# ── Binary search on answer (abstract) ─────────────────────
def min_feasible(lo, hi, feasible_fn):
    """Find minimum value x in [lo,hi] where feasible_fn(x) is True"""
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible_fn(mid): hi = mid
        else:                 lo = mid + 1
    return lo
```

---

## 4. Graph Algorithms

### BFS & DFS

```python
from collections import deque

def bfs(graph, start):
    """Shortest path (unweighted) — O(V + E)"""
    visited = {start}
    queue   = deque([(start, 0)])
    dist    = {start: 0}
    while queue:
        node, d = queue.popleft()
        for nbr in graph[node]:
            if nbr not in visited:
                visited.add(nbr)
                dist[nbr] = d + 1
                queue.append((nbr, d + 1))
    return dist

def dfs(graph, node, visited=None):
    """Full traversal / cycle detection — O(V + E)"""
    if visited is None: visited = set()
    visited.add(node)
    for nbr in graph[node]:
        if nbr not in visited:
            dfs(graph, nbr, visited)
    return visited
```

### Dijkstra — Single Source Shortest Path

```python
import heapq
from collections import defaultdict

def dijkstra(graph, start):
    """O((V + E) log V) — weighted, non-negative edges"""
    dist = defaultdict(lambda: float("inf"))
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist
```

### Bellman-Ford — Handles Negative Edges

```python
def bellman_ford(edges, n, start):
    """O(VE) — detects negative cycles"""
    dist = [float("inf")] * n
    dist[start] = 0
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    # Check negative cycle
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return None          # negative cycle detected
    return dist
```

### Topological Sort (Kahn's Algorithm)

```python
from collections import deque

def topo_sort(graph, n):
    """O(V + E) — DAG ordering, detects cycles"""
    in_degree = [0] * n
    for u in range(n):
        for v in graph[u]:
            in_degree[v] += 1

    queue  = deque(u for u in range(n) if in_degree[u] == 0)
    result = []
    while queue:
        u = queue.popleft()
        result.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    return result if len(result) == n else []   # [] = cycle detected
```

### Minimum Spanning Tree

`kruskal` expects a `UnionFind` class (same as in the data-structures skill reference).

```python
import heapq

# ── Kruskal — O(E log E) ───────────────────────────────────
def kruskal(n, edges):
    """edges = [(weight, u, v)]"""
    uf     = UnionFind(n)
    mst    = []
    total  = 0
    for w, u, v in sorted(edges):
        if uf.union(u, v):
            mst.append((u, v, w))
            total += w
    return mst, total

# ── Prim — O(E log V), better for dense graphs ─────────────
def prim(graph, start=0):
    visited = set()
    heap    = [(0, start, -1)]
    mst     = []
    total   = 0
    while heap:
        w, u, parent = heapq.heappop(heap)
        if u in visited: continue
        visited.add(u)
        if parent != -1:
            mst.append((parent, u, w))
            total += w
        for v, weight in graph[u]:
            if v not in visited:
                heapq.heappush(heap, (weight, v, u))
    return mst, total
```

---

## 5. Dynamic Programming

### DP Framework

```
1. Define state:         dp[i] = "answer to subproblem i"
2. Write recurrence:     dp[i] = f(dp[i-1], dp[i-2], ...)
3. Identify base cases:  dp[0] = ?, dp[1] = ?
4. Decide order:         bottom-up (iterative) or top-down (memoised)
5. Extract answer:       dp[n], max(dp), etc.
```

### Classic DP Patterns

```python
# ── 1D DP: Fibonacci / Climbing Stairs ─────────────────────
def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n+1):
        a, b = b, a + b
    return b

# ── 1D DP: Max Subarray (Kadane's) ─────────────────────────
def max_subarray(nums):
    best = cur = nums[0]
    for x in nums[1:]:
        cur  = max(x, cur + x)
        best = max(best, cur)
    return best

# ── 1D DP: Longest Increasing Subsequence — O(n log n) ──────
from bisect import bisect_left
def lis(nums):
    tails = []
    for x in nums:
        pos = bisect_left(tails, x)
        if pos == len(tails): tails.append(x)
        else:                  tails[pos] = x
    return len(tails)

# ── 2D DP: Edit Distance ────────────────────────────────────
def edit_distance(s, t):
    m, n = len(s), len(t)
    dp   = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s[i-1] == t[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]

# ── Knapsack (0/1) ──────────────────────────────────────────
def knapsack(weights, values, capacity):
    n  = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        for w in range(capacity, weights[i]-1, -1):   # reverse to avoid reuse
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]

# ── Coin Change (Unbounded) ─────────────────────────────────
def coin_change(coins, amount):
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1
```

### DP Pattern Recognition

```
Single sequence, choices at each step    → 1D DP
Two sequences / strings                  → 2D DP (LCS, Edit Distance)
Partitioning into groups                 → Partition DP
Counting paths on grid                   → Grid DP
Intervals                                → Interval DP (merge stones, burst balloons)
States on trees                          → Tree DP
Bitmask over subsets                     → Bitmask DP (TSP)
```

---

## 6. Greedy Algorithms

```
Greedy works when: local optimal → global optimal
Prove it with: Exchange Argument
   "If we swap the greedy choice with any other, the result is no better"
```

```python
# ── Activity Selection — max non-overlapping intervals ──────
def max_intervals(intervals):
    intervals.sort(key=lambda x: x[1])  # sort by end time
    count, end = 0, float("-inf")
    for start, finish in intervals:
        if start >= end:
            count += 1
            end    = finish
    return count

# ── Jump Game II — min jumps to reach end ──────────────────
def min_jumps(nums):
    jumps = cur_end = cur_far = 0
    for i in range(len(nums) - 1):
        cur_far = max(cur_far, i + nums[i])
        if i == cur_end:
            jumps  += 1
            cur_end = cur_far
    return jumps

# ── Task Scheduler — min time with cooldown ────────────────
from collections import Counter
import heapq
def task_scheduler(tasks, n):
    freq   = Counter(tasks)
    heap   = [-f for f in freq.values()]
    heapq.heapify(heap)
    time   = 0
    while heap:
        temp, cycle = [], min(n + 1, len(heap))
        for _ in range(cycle):
            time += 1
            if heap: temp.append(heapq.heappop(heap) + 1)
        for f in temp:
            if f < 0: heapq.heappush(heap, f)
        if heap: time += n + 1 - cycle
    return time
```

---

## 7. Backtracking

```python
# Template — apply to permutations, subsets, N-Queens, Sudoku
def backtrack(state, choices, result):
    if is_complete(state):
        result.append(state[:])
        return
    for choice in choices:
        if is_valid(state, choice):
            state.append(choice)          # make move
            backtrack(state, choices, result)
            state.pop()                   # undo move (backtrack)

# ── Permutations ───────────────────────────────────────────
def permutations(nums):
    result = []
    def bt(path, remaining):
        if not remaining: result.append(path); return
        for i, x in enumerate(remaining):
            bt(path + [x], remaining[:i] + remaining[i+1:])
    bt([], nums)
    return result

# ── Subsets ────────────────────────────────────────────────
def subsets(nums):
    result = []
    def bt(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            bt(i + 1, path)
            path.pop()
    bt(0, [])
    return result

# ── N-Queens ───────────────────────────────────────────────
def n_queens(n):
    result, cols, diag1, diag2 = [], set(), set(), set()
    board = [["."]*n for _ in range(n)]
    def bt(row):
        if row == n: result.append(["".join(r) for r in board]); return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2: continue
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            board[row][col] = "Q"
            bt(row + 1)
            board[row][col] = "."; cols.discard(col)
            diag1.discard(row-col); diag2.discard(row+col)
    bt(0)
    return result
```

---

## 8. String Algorithms

```python
# ── KMP — pattern matching O(n + m) ───────────────────────
def kmp_search(text, pattern):
    lps = build_lps(pattern)
    i   = j = 0
    matches = []
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1; j += 1
        if j == len(pattern):
            matches.append(i - j)
            j = lps[j-1]
        elif i < len(text) and text[i] != pattern[j]:
            if j: j = lps[j-1]
            else: i += 1
    return matches

def build_lps(pattern):
    lps = [0] * len(pattern)
    length, i = 0, 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1; lps[i] = length; i += 1
        elif length:
            length = lps[length-1]
        else:
            lps[i] = 0; i += 1
    return lps

# ── Rabin-Karp — rolling hash O(n + m) avg ─────────────────
def rabin_karp(text, pattern, base=31, mod=10**9+7):
    n, m    = len(text), len(pattern)
    p_hash  = t_hash = 0
    power   = 1
    matches = []
    for i in range(m):
        p_hash = (p_hash * base + ord(pattern[i])) % mod
        t_hash = (t_hash * base + ord(text[i]))    % mod
        if i: power = power * base % mod
    if p_hash == t_hash and text[:m] == pattern: matches.append(0)
    for i in range(1, n - m + 1):
        t_hash = (t_hash - ord(text[i-1]) * power) % mod
        t_hash = (t_hash * base + ord(text[i+m-1])) % mod
        if t_hash == p_hash and text[i:i+m] == pattern:
            matches.append(i)
    return matches

# ── Longest Palindromic Substring (Manacher) O(n) ──────────
def longest_palindrome(s):
    best = ""
    for center in range(len(s)):
        for lo, hi in [(center, center), (center, center+1)]:
            while lo >= 0 and hi < len(s) and s[lo] == s[hi]:
                lo -= 1; hi += 1
            if hi - lo - 1 > len(best):
                best = s[lo+1:hi]
    return best
```

---

## 9. Bit Manipulation

```python
import functools

# Common bit tricks
x & (x-1)       # Clear lowest set bit  (check if power of 2: x & (x-1) == 0)
x & (-x)        # Isolate lowest set bit
x ^ x           # 0   (XOR self = 0)
x ^ 0           # x   (XOR zero = identity)
a ^ b ^ a       # b   (find single number in pairs)
x >> 1          # Divide by 2
x << 1          # Multiply by 2
~x              # Bitwise NOT
(x >> i) & 1    # Get i-th bit
x | (1 << i)    # Set i-th bit
x & ~(1 << i)   # Clear i-th bit
x ^ (1 << i)    # Toggle i-th bit

# ── Count set bits (Brian Kernighan) ───────────────────────
def count_bits(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count

# ── Find single number (all others appear twice) ───────────
def single_number(nums):
    return functools.reduce(lambda a, b: a ^ b, nums)

# ── Generate all subsets using bitmask ─────────────────────
def all_subsets(arr):
    n = len(arr)
    return [[arr[j] for j in range(n) if mask & (1<<j)]
            for mask in range(1 << n)]
```

---

## 10. Algorithm Paradigm Selection

```
Is the problem asking for ALL solutions?              → Backtracking
Is there overlapping subproblems?                     → Dynamic Programming
Does greedy local choice lead to global optimum?      → Greedy
Can you split into independent halves?                → Divide & Conquer
Does it involve nodes and edges?                      → Graph Algorithm
Sorted data + O(log n) needed?                        → Binary Search
Two indices moving through array?                     → Two Pointers
Contiguous subarray with constraint?                  → Sliding Window
String pattern matching?                              → KMP / Rabin-Karp
Connected components / cycles?                        → Union-Find / DFS
Shortest path, unweighted?                            → BFS
Shortest path, weighted non-negative?                 → Dijkstra
Shortest path, negative edges?                        → Bellman-Ford
All-pairs shortest path?                              → Floyd-Warshall
Minimum spanning tree?                                → Kruskal / Prim
Repeatedly need min/max?                              → Heap
```

---

## 11. Correctness & Testing

```python
# ── Test every algorithm with these cases ──────────────────
EDGE_CASES = {
    "empty":        [],
    "single":       [1],
    "two":          [1, 2],
    "duplicates":   [1, 1, 1],
    "sorted":       [1, 2, 3, 4, 5],
    "reverse":      [5, 4, 3, 2, 1],
    "negatives":    [-3, -1, 0, 2, 4],
    "all_same":     [7, 7, 7, 7],
    "large_n":      list(range(100_000)),
}

# ── Property-based: verify against brute force ─────────────
import random
def stress_test(fast_fn, brute_fn, trials=1000):
    for _ in range(trials):
        arr = random.choices(range(-100, 100), k=random.randint(1, 20))
        assert fast_fn(arr[:]) == brute_fn(arr[:]), f"Mismatch on {arr}"
    print(f"Passed {trials} random tests")
```

---

## 12. Interview Problem-Solving Template

```
Step 1 — Clarify (2 min)
  - Input type, range, constraints
  - Can input have duplicates / negatives?
  - Is input sorted?

Step 2 — Examples (2 min)
  - Walk through 1-2 examples by hand
  - Draw it out for graphs/trees

Step 3 — Brute Force (2 min)
  - State the naive O(n²) or O(2ⁿ) solution
  - Mention why it's too slow

Step 4 — Optimise (5 min)
  - Identify the bottleneck
  - Apply the right paradigm (see Section 10)

Step 5 — Code (15 min)
  - Write clean, modular code
  - Use helper functions

Step 6 — Test (3 min)
  - Run through edge cases: empty, single, duplicates
  - Trace through your example
```

> "An algorithm must be seen to be believed." — Donald Knuth