1.  Static Cast: Static cast is used for explicit type conversion at compile time. It is the most basic form of explicit type casting. It can be used to convert a value from one data type to another data type. For example,

```cpp
int x = 10;
float y = static_cast<float>(x);
```

Here, the int value of x is being explicitly converted to a float value and assigned to the variable y.

2.  Const Cast: Const cast is used to remove or add the const or volatile qualifier from a variable. For example,

```cpp
const int x = 10;
int* y = const_cast<int*>(&x);
```

Here, the const qualifier is removed from the int variable x, allowing it to be modified through the pointer y.

3.  Reinterpret Cast: Reinterpret cast is used to convert a value from one data type to another, but the resulting value is not guaranteed to be meaningful. It is used to interpret the binary representation of an object in a different type. For example,


```cpp
int x = 10;
float* y = reinterpret_cast<float*>(&x);
```

Here, the address of the int variable x is being converted to a pointer to a float and assigned to the variable y. But this conversion is not guaranteed to be meaningful.

4.  Dynamic Cast: Dynamic cast is used to perform a type-safe downcast, i.e. it checks if the object being casted can be casted to the desired class or not. It is used to convert a pointer or reference from a base class to a derived class. For example,


```cpp
class Shape {};
class Circle : public Shape {};
Shape* shape = new Circle;
Circle* circle = dynamic_cast<Circle*>(shape);
```

Here, the pointer shape, which points to an object of the class Circle, is being cast to a pointer of the class Circle. If the shape pointer does not point to an object of the class Circle, the result of this cast will be a null pointer.

It's important to remember that these casting are not always safe, it's important to know when it's appropriate to use each casting method and understand the potential risks of using them.