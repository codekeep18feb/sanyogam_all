import threading
import requests

def fetch_post_data(post_id):
    url = f'https://jsonplaceholder.typicode.com/posts/{post_id}'
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print(f"Save here if needd to space:: Post {post_id} fetched: {data['title']}")
    else:
        print(f"Failed to fetch Post {post_id}. Status code: {response.status_code}")

def main():
    # Number of API requests
    num_requests = 100
    
    # Create a list to store thread instances
    threads = []

    # Create threads for each API request
    for i in range(1, num_requests + 1):
        thread = threading.Thread(target=fetch_post_data, args=(i,))
        threads.append(thread)

    # Start all threads
    for thread in threads:
        thread.start()

    # Wait for all threads to complete
    # for thread in threads:
    #     thread.join()
    print('before continuign to rest of the program??')

if __name__ == "__main__":
    main()
