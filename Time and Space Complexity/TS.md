# ⏱️ Time & Space Complexity

> Understanding **Time Complexity** and **Space Complexity** is essential for analyzing the efficiency of algorithms. They help us compare different solutions and choose the most optimal one for a given problem.

---

# 📖 Table of Contents

- What is Time Complexity?
- What is Space Complexity?
- Why Complexity Analysis?
- Asymptotic Analysis
- Big O Notation (O)
- Big Omega Notation (Ω)
- Big Theta Notation (Θ)
- Comparison Table
- Examples
- Complexity Cheat Sheet
- Interview Tips

---

# 📌 What is Time Complexity?

Time Complexity is the amount of **time** an algorithm takes to execute as the input size (**n**) increases.

It does **not** measure actual execution time in seconds.

Instead, it measures the **growth rate** of the algorithm.

### Example

```java
for(int i=0;i<n;i++){
    System.out.println(i);
}
```

The loop executes **n** times.

**Time Complexity = O(n)**

---

# 📌 What is Space Complexity?

Space Complexity is the amount of **extra memory** used by an algorithm during execution.

It includes:

- Variables
- Temporary Arrays
- Function Call Stack
- Dynamic Memory Allocation

### Example

```java
int sum = 0;
```

Only one variable is used.

**Space Complexity = O(1)**

---

# ❓ Why Complexity Analysis?

Complexity analysis helps us

- Compare algorithms
- Select the most efficient solution
- Predict performance for large inputs
- Optimize programs

---

# 📈 Asymptotic Analysis

Asymptotic Analysis studies algorithm performance as the input size (**n**) becomes very large.

Three important notations are:

- Big O (O)
- Big Omega (Ω)
- Big Theta (Θ)

---

# 🔴 Big O Notation (O)

## Definition

Big O represents the **Upper Bound** of an algorithm.

It tells us the **maximum amount of time** an algorithm may take.

### Represents

✅ Worst Case

---

## Mathematical Definition

```
T(n) ≤ C × f(n)

for n ≥ n₀
```

where

- T(n) = Running Time
- f(n) = Complexity Function
- C = Constant
- n₀ = Starting Point

---

## Example

Linear Search

```java
int linearSearch(int arr[], int key){

    for(int i=0;i<arr.length;i++){

        if(arr[i]==key)
            return i;

    }

    return -1;

}
```

Worst Case

The element is not present.

The loop runs **n** times.

### Time Complexity

```
O(n)
```

---

## Real-Life Example

Searching a name in an unsorted notebook.

You may need to check every page.

Worst Case

```
O(n)
```

---

# 🟢 Big Omega Notation (Ω)

## Definition

Big Omega represents the **Lower Bound** of an algorithm.

It tells us the **minimum amount of time** required.

### Represents

✅ Best Case

---

## Mathematical Definition

```
T(n) ≥ C × f(n)

for n ≥ n₀
```

---

## Example

Binary Search

```java
int binarySearch(int arr[], int key){

    int left=0;
    int right=arr.length-1;

    while(left<=right){

        int mid=(left+right)/2;

        if(arr[mid]==key)
            return mid;

        if(arr[mid]<key)
            left=mid+1;
        else
            right=mid-1;

    }

    return -1;

}
```

Best Case

Target found at first middle element.

```
Ω(1)
```

---

## Real-Life Example

Finding a book placed exactly in front of you.

Only one check is required.

```
Ω(1)
```

---

# 🔵 Big Theta Notation (Θ)

## Definition

Big Theta represents the **Tight Bound**.

It gives both the

- Upper Bound
- Lower Bound

The algorithm always grows at the same rate.

### Represents

✅ Average / Exact Growth

---

## Mathematical Definition

```
C₁ × f(n)

≤ T(n)

≤ C₂ × f(n)
```

for

```
n ≥ n₀
```

---

## Example

Merge Sort

Merge Sort always divides the array into two halves.

```
Θ(n log n)
```

Best Case

```
Θ(n log n)
```

Worst Case

```
Θ(n log n)
```

Average Case

```
Θ(n log n)
```

---

## Real-Life Example

Dividing a phone directory into halves repeatedly.

The work grows consistently.

```
Θ(n log n)
```

---

# 📊 Comparison Table

| Notation | Represents | Case | Example |
|----------|------------|------|----------|
| **O(f(n))** | Upper Bound | Worst Case | Linear Search → O(n) |
| **Ω(f(n))** | Lower Bound | Best Case | Binary Search → Ω(1) |
| **Θ(f(n))** | Tight Bound | Average/Exact | Merge Sort → Θ(n log n) |

---

# 📈 Relationship

```
           Worst Case
                ▲
                │
             Big O
                │
                │
             Big Θ
                │
                │
          Big Ω
                │
                ▼
            Best Case
```

---

# 💡 Example Comparison

Suppose we search an element in an array.

### Linear Search

Best Case

```
Ω(1)
```

Average Case

```
Θ(n)
```

Worst Case

```
O(n)
```

---

### Binary Search

Best Case

```
Ω(1)
```

Average Case

```
Θ(log n)
```

Worst Case

```
O(log n)
```

---

# 📌 Complexity Cheat Sheet

| Operation | Best | Average | Worst |
|-----------|------|---------|-------|
| Linear Search | Ω(1) | Θ(n) | O(n) |
| Binary Search | Ω(1) | Θ(log n) | O(log n) |
| Bubble Sort | Ω(n) | Θ(n²) | O(n²) |
| Merge Sort | Θ(n log n) | Θ(n log n) | O(n log n) |

---

# 🎯 Interview Tips

✅ Big O → Worst Case

✅ Big Omega → Best Case

✅ Big Theta → Tight Bound (Average/Exact Growth)

Always mention **both Time Complexity and Space Complexity** when explaining an algorithm.

---

# 📚 Summary

- **Time Complexity** measures execution time growth.
- **Space Complexity** measures extra memory usage.
- **Big O (O)** describes the worst-case upper bound.
- **Big Omega (Ω)** describes the best-case lower bound.
- **Big Theta (Θ)** describes the exact or tight bound.
- These notations help compare algorithms and select efficient solutions.