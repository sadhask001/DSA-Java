# Complete Guide to Asymptotic Notations

## Table of Contents

1.  Introduction
2.  Big O Notation
3.  Big Omega Notation
4.  Big Theta Notation
5.  Growth Types
6.  Comparison Table
7.  Interview Tips

------------------------------------------------------------------------

# Introduction

Asymptotic notations describe how an algorithm behaves as the input size
(**n**) becomes very large.

They ignore: - Machine speed - Programming language - Compiler
optimizations

They focus only on **growth rate**.

------------------------------------------------------------------------

# 1. Big O Notation (O)

## Definition

Big O represents the **Upper Bound** of an algorithm.

It tells the **maximum time** an algorithm may require.

### Represents

-   Worst Case

## Mathematical Formula

T(n) ≤ C × f(n)

for n ≥ n₀

Where

-   T(n) = Actual running time
-   f(n) = Complexity function
-   C = Positive constant
-   n₀ = Starting input size

## Example

``` java
for(int i=0;i<n;i++){
    System.out.println(i);
}
```

### Calculation

Loop runs n times.

Operations

1 + 1 + 1 + ... + 1

= n

Time Complexity

O(n)

Space Complexity

O(1)

## Another Example

``` java
for(int i=0;i<n;i++){
    for(int j=0;j<n;j++){
        System.out.println(i+j);
    }
}
```

Outer loop = n

Inner loop = n

Total Operations

n × n

= n²

Time Complexity

O(n²)

Space Complexity

O(1)

## Real-Life Example

Searching every page of an unsorted notebook.

Worst case = every page checked.

------------------------------------------------------------------------

# 2. Big Omega Notation (Ω)

## Definition

Big Omega represents the **Lower Bound**.

It tells the **minimum amount of work** required.

### Represents

-   Best Case

## Mathematical Formula

T(n) ≥ C × f(n)

for n ≥ n₀

## Example

``` java
int linearSearch(int arr[],int key){
    for(int i=0;i<arr.length;i++){
        if(arr[i]==key)
            return i;
    }
    return -1;
}
```

### Best Case

Element found at first position.

Operations

1

Time Complexity

Ω(1)

Space Complexity

O(1)

## Another Example

Binary Search

``` java
while(low<=high){
    int mid=(low+high)/2;
    if(arr[mid]==key)
        return mid;
}
```

If first middle element is the answer,

Operations = 1

Ω(1)

------------------------------------------------------------------------

# 3. Big Theta Notation (Θ)

## Definition

Big Theta represents the **Tight Bound**.

It gives both upper and lower bounds.

### Represents

-   Exact Growth
-   Average Growth (commonly used)

## Mathematical Formula

C₁ × f(n) ≤ T(n) ≤ C₂ × f(n)

for n ≥ n₀

## Example

Merge Sort

``` java
void mergeSort(int arr[],int l,int r){
    if(l<r){
        int mid=(l+r)/2;

        mergeSort(arr,l,mid);
        mergeSort(arr,mid+1,r);

        merge(arr,l,mid,r);
    }
}
```

### Calculation

Levels of recursion

log n

Each level processes

n elements

Total

n × log n

Θ(n log n)

Best

Θ(n log n)

Average

Θ(n log n)

Worst

Θ(n log n)

Space

O(n)

------------------------------------------------------------------------

# Common Growth Types

  Growth       Example
  ------------ -----------------------
  O(1)         Array Index
  O(log n)     Binary Search
  O(√n)        Prime Checking
  O(n)         Linear Search
  O(n log n)   Merge Sort
  O(n²)        Bubble Sort
  O(n³)        Matrix Multiplication
  O(2ⁿ)        Subset Generation
  O(n!)        Permutations

------------------------------------------------------------------------

# Comparison

  Notation   Meaning       Case    Example
  ---------- ------------- ------- ---------------
  O(f(n))    Upper Bound   Worst   Linear Search
  Ω(f(n))    Lower Bound   Best    Linear Search
  Θ(f(n))    Tight Bound   Exact   Merge Sort

------------------------------------------------------------------------

# Key Differences

  Feature      Big O         Big Ω         Big Θ
  ------------ ------------- ------------- --------------
  Meaning      Upper Bound   Lower Bound   Tight Bound
  Represents   Worst Case    Best Case     Exact Growth
  Symbol       O             Ω             Θ

------------------------------------------------------------------------

# Interview Tips

-   Big O → Maximum operations.
-   Big Ω → Minimum operations.
-   Big Θ → Same growth in upper and lower bounds.
-   Always mention both **Time Complexity** and **Space Complexity**.
-   Explain **why** a complexity occurs by counting loops, recursive
    levels, or memory usage.

------------------------------------------------------------------------

# Summary

-   Big O measures the worst-case growth.
-   Big Ω measures the best-case growth.
-   Big Θ measures the exact growth when upper and lower bounds match.
-   These notations are essential for comparing algorithms and choosing
    efficient solutions.