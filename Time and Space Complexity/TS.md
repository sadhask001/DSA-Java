
# Time and Space Complexity – Complete Guide

## What is Time Complexity?
Time complexity measures how the execution time of an algorithm grows as the input size (**n**) increases.

## What is Space Complexity?
Space complexity measures the amount of extra memory an algorithm requires as the input size grows.

---

# Asymptotic Notations

| Notation | Meaning | Example |
|----------|---------|---------|
| **O(f(n))** | Worst Case (Upper Bound) | Linear Search → O(n) |
| **Ω(f(n))** | Best Case (Lower Bound) | Binary Search → Ω(1) |
| **Θ(f(n))** | Tight Bound | Merge Sort → Θ(n log n) |
| **o(f(n))** | Strict Upper Bound | n is o(n²) |
| **ω(f(n))** | Strict Lower Bound | n² is ω(n) |

---

# Common Time Complexities

| Complexity | Growth | Example |
|------------|--------|---------|
| O(1) | Constant | Array Index Access |
| O(log n) | Logarithmic | Binary Search |
| O(n) | Linear | Linear Search |
| O(n log n) | Linearithmic | Merge Sort, Quick Sort (Average) |
| O(n²) | Quadratic | Bubble Sort |
| O(2ⁿ) | Exponential | Recursive Fibonacci |
| O(n!) | Factorial | Brute Force Permutations |

---

# Time Complexity Example (Java)

```java
public static int binarySearch(int[] arr, int key) {
    int left = 0;
    int right = arr.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            left = mid + 1;
        else
            right = mid - 1;
    }

    return -1;
}
```

**Time Complexity:** O(log n)

**Space Complexity:** O(1)

---

# Space Complexity Examples

- O(1): Variables only
- O(log n): Recursive Binary Search
- O(n): Auxiliary Array
- O(n): DFS Recursion Stack (Worst Case)

---

# Complexity Order (Fastest → Slowest)

```
O(1)
↓
O(log n)
↓
O(n)
↓
O(n log n)
↓
O(n²)
↓
O(n³)
↓
O(2ⁿ)
↓
O(n!)
```

---

# Best, Average and Worst Case

| Case | Meaning |
|------|---------|
| Best | Minimum execution time |
| Average | Expected execution time |
| Worst | Maximum execution time |

---

# Interview Tips

- Mention both Time and Space Complexity.
- Count nested loops carefully.
- Analyze recursive calls separately.
- Auxiliary space excludes input storage.
- Prefer O(log n) or O(n log n) when possible.

---

## GitHub Repository Structure

```
DSA/
│── README.md
│── Time-and-Space-Complexity/
│   ├── doc.md
│   ├── graphs/
│   ├── java/
│   └── images/
```
