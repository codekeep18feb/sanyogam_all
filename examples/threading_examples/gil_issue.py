import threading

counter = 0

def increment():
    global counter
    for _ in range(1000000):
        counter += 1

def main():
    # Create two threads
    thread1 = threading.Thread(target=increment)
    thread2 = threading.Thread(target=increment)

    # Start both threads
    thread1.start()
    thread2.start()

    # Wait for both threads to finish
    thread1.join()
    thread2.join()

    print("Counter:", counter)

if __name__ == "__main__":
    main()
