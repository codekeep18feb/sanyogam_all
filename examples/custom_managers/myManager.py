import time

class TimerContextManager(object):
    def __enter__(self):
        self.start_time = time.time()
        print("Timer started.")

    def __exit__(self, exc_type, exc_value, traceback):
        self.end_time = time.time()
        elapsed_time = self.end_time - self.start_time
        print(f"Timer stopped. Elapsed time: {elapsed_time:.2f} seconds.")

# Example of using the custom context manager
with TimerContextManager():
    # Some code to measure the execution time
    time.sleep(2)
    a = 'some'
    print("Code block executed.")
print('a',a)