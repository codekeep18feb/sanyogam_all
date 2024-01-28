

class DictWithDotAccess:
    def __init__(self, dictionary):
        self.dictionary = dictionary

    def __getattr__(self, key):
        if key in self.dictionary:
            return self.dictionary[key]
        else:
            raise AttributeError(f"'DictWithDotAccess' object has no attribute '{key}'")

