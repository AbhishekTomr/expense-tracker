import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-4xl justify-between">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=classNameNameat&fit=crop&w=667&q=80)",
          }}
        ></div>
        <div>
          <h1 className="text-3xl text-center font-bold my-3">
            Register User !!
          </h1>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
