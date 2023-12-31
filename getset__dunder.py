class DescriptorExample:
    def __init__(self, initial_value=None):
        self._value = initial_value

    def __get__(self, instance, owner):
        print(f"Getting value: {self._value}, {owner}, {type(instance)} ,{self}")
        return self._value

    def __set__(self, instance, value):
        print(f"Setting value to: {value}")
        if value < 0:
            raise ValueError("Value must be non-negative.")
        self._value = value

class MyClass:
    my_descriptor = DescriptorExample()

# Example usage
obj = MyClass()

# Using the descriptor to get and set the value
obj.my_descriptor = 42  # Calls __set__
print(obj.my_descriptor)  # Calls __get__

# This would raise a ValueError due to the setter logic
# obj.my_descriptor = -5
