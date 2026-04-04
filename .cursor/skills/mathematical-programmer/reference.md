# Mathematical Programmer — Reference

Constraint order when they conflict: correctness, then stability, then performance.

---

## 1. Foundations: Numerical Thinking

### Floating Point Rules

Never trust naive floating point. Always ask: *where can this lose precision?*

```python
# Wrong — catastrophic cancellation
def variance_naive(data):
    n    = len(data)
    mean = sum(data) / n
    return sum((x - mean)**2 for x in data) / n

# Correct — Welford's online algorithm (numerically stable)
def variance_stable(data):
    n = mean = M2 = 0
    for x in data:
        n    += 1
        delta = x - mean
        mean += delta / n
        M2   += delta * (x - mean)
    return M2 / n if n > 1 else 0.0
```

### Numerical Stability Checklist

- Avoid subtracting nearly equal numbers — use alternative forms
- Avoid dividing by values near zero — add epsilon guard
- Use log-space for products of small probabilities: `log(a*b) = log(a)+log(b)`
- Prefer `numpy` over manual loops — vectorised ops have controlled rounding
- Use `math.fsum()` for long summations — compensated summation
- Check condition numbers before inverting matrices

### Epsilon Example

```python
EPS = 1e-10
EPS_PROB = 1e-15

def safe_divide(a, b, fallback=0.0):
    return a / b if abs(b) > EPS else fallback

import numpy as np

def safe_log(x):
    return np.log(np.clip(x, EPS_PROB, None))
```

---

## 2. Linear Algebra

### Matrix Operations — Right Tool for the Job

| Operation | Use | Never Use |
| --- | --- | --- |
| Solve `Ax = b` | `np.linalg.solve(A, b)` | `np.linalg.inv(A) @ b` |
| Least squares | `np.linalg.lstsq(A, b)` | Manual normal equations |
| Eigenvalues (symmetric) | `np.linalg.eigh(A)` | `eig()` on symmetric matrix |
| Large sparse systems | `scipy.sparse.linalg.spsolve` | Dense `linalg.solve` |
| SVD (truncated) | `scipy.sparse.linalg.svds(k=r)` | Full `np.linalg.svd` |

```python
import numpy as np

A = np.array([[3, 1], [1, 2]], dtype=float)
b = np.array([9, 8], dtype=float)
x = np.linalg.solve(A, b)

cond = np.linalg.cond(A)
if cond > 1e12:
    print(f"Ill-conditioned matrix (cond={cond:.2e}), results unreliable")

U, s, Vt = np.linalg.svd(A, full_matrices=False)

Q, R = np.linalg.qr(A)
x_qr = np.linalg.solve(R, Q.T @ b)
```

### Broadcasting Rules (NumPy)

```python
def pairwise_distances(X):
    diff = X[:, np.newaxis, :] - X[np.newaxis, :, :]
    return np.sqrt((diff**2).sum(axis=-1))
```

---

## 3. Statistics & Probability

```python
import numpy as np
from scipy import stats

def describe(data):
    a = np.asarray(data)
    return {
        "mean"    : np.mean(a),
        "median"  : np.median(a),
        "std"     : np.std(a, ddof=1),
        "skew"    : stats.skew(a),
        "kurtosis": stats.kurtosis(a),
        "iqr"     : stats.iqr(a),
    }

def log_sum_exp(x):
    c = np.max(x)
    return c + np.log(np.sum(np.exp(x - c)))

def softmax(x):
    e = np.exp(x - np.max(x))
    return e / e.sum()

def beta_posterior(prior_alpha, prior_beta, successes, trials):
    post_alpha = prior_alpha + successes
    post_beta  = prior_beta  + (trials - successes)
    return post_alpha, post_beta

def two_sample_ttest(a, b, alpha=0.05):
    t_stat, p_val = stats.ttest_ind(a, b, equal_var=False)
    return {"t": t_stat, "p": p_val, "reject_H0": p_val < alpha}
```

Probability pitfalls: use log-space for long products; compare probabilities with tolerance, not `== 1.0`.

---

## 4. Optimisation

```python
import numpy as np

def sgd(params, grads, lr=0.01):
    return params - lr * grads

class MomentumSGD:
    def __init__(self, lr=0.01, momentum=0.9):
        self.lr, self.momentum, self.v = lr, momentum, None

    def step(self, params, grads):
        if self.v is None:
            self.v = np.zeros_like(params)
        self.v = self.momentum * self.v - self.lr * grads
        return params + self.v

class Adam:
    def __init__(self, lr=1e-3, b1=0.9, b2=0.999, eps=1e-8):
        self.lr, self.b1, self.b2, self.eps = lr, b1, b2, eps
        self.m = self.v = self.t = None

    def step(self, params, grads):
        if self.m is None:
            self.m = np.zeros_like(params)
            self.v = np.zeros_like(params)
            self.t = 0
        self.t += 1
        self.m  = self.b1 * self.m + (1 - self.b1) * grads
        self.v  = self.b2 * self.v + (1 - self.b2) * grads**2
        m_hat   = self.m / (1 - self.b1**self.t)
        v_hat   = self.v / (1 - self.b2**self.t)
        return params - self.lr * m_hat / (np.sqrt(v_hat) + self.eps)
```

```python
from scipy.optimize import minimize
import numpy as np

def rosenbrock(x):
    return sum(100*(x[i+1] - x[i]**2)**2 + (1 - x[i])**2
               for i in range(len(x)-1))

result = minimize(
    rosenbrock,
    x0=np.zeros(5),
    method="L-BFGS-B",
    jac=None,
    options={"maxiter": 1000, "ftol": 1e-12}
)
```

| Problem Type | Algorithm | Library |
| --- | --- | --- |
| Smooth, unconstrained | L-BFGS-B | `scipy.optimize` |
| Constrained, nonlinear | SLSQP | `scipy.optimize` |
| Discrete / combinatorial | Simulated Annealing | `scipy.optimize.dual_annealing` |
| Linear programming | Simplex / HiGHS | `scipy.optimize.linprog` |
| Neural network training | Adam | `torch.optim.Adam` |
| Convex QP | OSQP | `osqp` |

---

## 5. Signal Processing & Transforms

```python
import numpy as np
from scipy import signal, fft

def analyse_signal(x, fs=1.0):
    N      = len(x)
    freqs  = fft.rfftfreq(N, d=1/fs)
    amp    = np.abs(fft.rfft(x)) * 2 / N
    dom_f  = freqs[np.argmax(amp)]
    return freqs, amp, dom_f

def moving_average(x, window=5):
    kernel = np.ones(window) / window
    return np.convolve(x, kernel, mode="same")

def lowpass_filter(data, cutoff_hz, fs_hz, order=4):
    nyq    = fs_hz / 2
    normal = cutoff_hz / nyq
    b, a   = signal.butter(order, normal, btype="low")
    return signal.filtfilt(b, a, data)
```

---

## 6. Interpolation & Curve Fitting

```python
import numpy as np
from scipy import interpolate, optimize

x = np.linspace(0, 10, 20)
y = np.sin(x)
cs    = interpolate.CubicSpline(x, y)
x_new = np.linspace(0, 10, 200)
y_new = cs(x_new)

def poly_fit(x, y, degree=3):
    coeffs = np.polyfit(x, y, degree)
    poly   = np.poly1d(coeffs)
    y_pred = poly(x)
    r2     = 1 - np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2)
    return poly, r2

def model(x, a, b, c):
    return a * np.exp(-b * x) + c

xdata  = np.linspace(0, 4, 50)
ydata  = model(xdata, 2.5, 1.3, 0.5) + 0.1 * np.random.randn(50)

popt, pcov = optimize.curve_fit(model, xdata, ydata, p0=[1, 1, 0])
perr       = np.sqrt(np.diag(pcov))
```

---

## 7. Computational Geometry & Graph Math

```python
import numpy as np

def euclidean(a, b):
    return np.sqrt(np.sum((a - b)**2))

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def manhattan(a, b):
    return np.sum(np.abs(a - b))

def point_in_polygon(point, polygon):
    x, y   = point
    n      = len(polygon)
    inside = False
    j      = n - 1
    for i in range(n):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside

def polygon_area(vertices):
    n  = len(vertices)
    v  = np.array(vertices)
    return 0.5 * abs(
        sum(v[i][0]*v[(i+1)%n][1] - v[(i+1)%n][0]*v[i][1] for i in range(n))
    )
```

---

## 8. Performance Patterns

Vectorise with NumPy; use `numba.njit` for hot loops when appropriate.

```python
from numba import njit

@njit(parallel=True)
def fast_norm(matrix):
    return np.sqrt((matrix**2).sum(axis=1))
```

Prefer row-wise ops on C-contiguous arrays; use `np.ascontiguousarray` before heavy ops.

Einsum examples:

```python
result = np.einsum("bmk,bkn->bmn", A, B)
outer = np.einsum("i,j->ij", a, b)
trace = np.einsum("ii->", A)
```

---

## 9. Testing Mathematical Code

```python
import numpy as np

def numerical_gradient(f, x, h=1e-5):
    grad = np.zeros_like(x)
    for i in range(len(x)):
        x1, x2 = x.copy(), x.copy()
        x1[i] += h; x2[i] -= h
        grad[i] = (f(x1) - f(x2)) / (2 * h)
    return grad
```

Use `np.testing.assert_allclose` for floats; test FFT round-trips; compare analytical vs numerical gradients where applicable.

---

## 10. Essential Libraries Reference

| Domain | Library | Key Functions |
| --- | --- | --- |
| Arrays & Linear Algebra | `numpy` | `linalg`, `einsum`, `fft` |
| Scientific Computing | `scipy` | `optimize`, `signal`, `stats`, `interpolate` |
| Symbolic Math | `sympy` | `solve`, `diff`, `integrate`, `Matrix` |
| JIT Compilation | `numba` | `@njit`, `@vectorize`, `parallel=True` |
| GPU Arrays | `cupy` | Drop-in NumPy on GPU |
| Sparse Matrices | `scipy.sparse` | `csr_matrix`, `spsolve` |
| Plotting Math | `matplotlib` | `plot`, `imshow`, `contour` |
| ML Math | `torch` | Autograd, CUDA tensors |
| Statistics | `statsmodels` | OLS, time series, hypothesis tests |

---

## Quick Reference: Formula to Code

| Concept | Code |
| --- | --- |
| Mean | `np.mean(x)` |
| Sample variance | `np.var(x, ddof=1)` |
| Dot product | `np.dot(a, b)` |
| Matrix multiply | `A @ B` |
| Determinant | `np.linalg.det(A)` |
| Eigenvalues (symmetric) | `np.linalg.eigh(A)` |
| Integral | `scipy.integrate.quad(f, a, b)` |
| Convolution | `np.convolve(f, g)` |
| Fourier (real) | `np.fft.rfft(x)` |
| L2 norm | `np.linalg.norm(x)` |
| Softmax | `scipy.special.softmax(x)` |

Cross-entropy: use `safe_log` on probabilities: `-np.sum(y * safe_log(y_hat))`.
