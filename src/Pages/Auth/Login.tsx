import { AuthLayout } from "@/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { AtSign } from "lucide-react";
import { useEffect } from "react";
import { ButtonWithLoader, InputWithIcon } from "@/Components/UI";

type FormData = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const Login = () => {
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    login(data.email);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <AuthLayout
        title="Welcome back! 👋"
        description="Sign in to your account to continue"
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputWithIcon
            icon={<AtSign size={20} />}
            label="Email address"
            placeholder="e.g johndoe@mail.com"
            type="email"
            {...register("email")}
            error={errors.email && errors?.email.message}
          />
          <div className="space-y-2 mt-6">
            <ButtonWithLoader
              loading={isLoading}
              initialText="Login"
              loadingText="Logging in..."
              type="submit"
              className="bg-primary h-11 w-full text-sm font-medium text-white rounded-full"
            />
            <p className="text-center text-sm text-gray-500">- Or -</p>
            <Link
              to="/signup"
              className="btn bg-primary/10 text-primary font-medium h-11 rounded-full text-sm"
            >
              {" "}
              Create an Account
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
