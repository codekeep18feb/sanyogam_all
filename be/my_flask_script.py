from app import create_app, db, User, Profile

my_app = create_app()

@my_app.cli.command("shell")
def shell():
    """Runs a Python shell inside Flask application context."""
    context = {
        'app': my_app,
        'db': db,
        'User': User,
        'Profile': Profile,
    }
    try:
        import IPython
        IPython.embed(user_ns=context)
    except ImportError:
        import code
        code.interact(local=context)

if __name__ == '__main__':
    my_app.run(host='0.0.0.0', port=8000, debug=True)
