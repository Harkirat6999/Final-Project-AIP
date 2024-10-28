# chatbot.py
def respond_to_user(input_text):
    responses = {
        "hello": "Hi there! How can I help you today?",
        "how are you?": "I'm just a program, but I'm functioning as expected!",
        "bye": "Goodbye! Have a great day!"
    }
    return responses.get(input_text.lower(), "Sorry, I didn't understand that.")

def main():
    print("Welcome to the chatbot! Type 'bye' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "bye":
            print("Chatbot: Goodbye! Have a great day!")
            break
        response = respond_to_user(user_input)
        print(f"Chatbot: {response}")

if __name__ == "__main__":
    main()
