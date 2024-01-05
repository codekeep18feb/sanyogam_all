# class Animal:
#     def speak(self):
#         return "Generic animal sound"

# class Dog(Animal):
#     def speak(self):
#         return f"{super().speak()} Woof!"

# class Cat(Animal):
#     def speak(self):
#         return f"{super().speak()} Meow!"

# # Example usage
# dog = Dog()
# cat = Cat()

# print(dog.speak())  # Output: Generic animal sound Woof!
# print(cat.speak())  # Output: Generic animal sound Meow!


class Animal:
    def speak(self):
        return "Generic animal sound"

class Dog:
    def __init__(self, animal):
        self.animal = animal

    def speak(self):
        return f"{self.animal.speak()} Woof!"

class Cat:
    def __init__(self, animal):
        self.animal = animal

    def speak(self):
        return f"{self.animal.speak()} Meow!"

# Example usage
animal = Animal()
dog = Dog(animal)
cat = Cat(animal)

print(dog.speak())  # Output: Generic animal sound Woof!
print(cat.speak())  # Output: Generic animal sound Meow!
