class CustomList:
    def __init__(self):
        self.items = []

    def __getitem__(self, index):
        return self.items[index]

    def __setitem__(self, index, value):
        self.items[index] = value

    def __delitem__(self, index):
        del self.items[index]

    def __iter__(self):
        self.current_index = 0
        return self

    def __next__(self):
        if self.current_index < len(self.items):
            result = self.items[self.current_index]
            self.current_index += 1
            return result
        else:
            raise StopIteration

    def __eq__(self, other):
        return self.items == other.items

    def __ne__(self, other):
        return self.items != other.items

    def __lt__(self, other):
        return len(self.items) < len(other.items)

    def __gt__(self, other):
        return len(self.items) > len(other.items)

    def __le__(self, other):
        return len(self.items) <= len(other.items)

    def __ge__(self, other):
        return len(self.items) >= len(other.items)

    def __call__(self, *args, **kwargs):
        return f"Called with args: {args}, kwargs: {kwargs}"

    def __enter__(self):
        print("Entering context")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting context")

# Example usage:
list1 = CustomList()
list1.items = [1, 2, 3, 4, 5]

list2 = CustomList()
list2.items = [5, 4, 3, 2, 1]

# Indexing
print(list1[2])  # Output: 3

# Assigning a value to an indexed element
list1[2] = 10
print(list1.items)  # Output: [1, 2, 10, 4, 5]

# Deleting an indexed element
del list1[2]
print(list1.items)  # Output: [1, 2, 4, 5]

# Iterating over the object
for item in list1:
    print(item)

# Equality
print(list1 == list2)  # Output: False

# Comparison
print(list1 > list2)  # Output: True

# Calling as a function
result = list1(1, 2, arg1="value")
print(result)  # Output: Called with args: (1, 2), kwargs: {'arg1': 'value'}

# Context management
with list1 as context_obj:
    print("Inside the context")
