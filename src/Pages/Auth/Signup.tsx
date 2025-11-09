import { AuthLayout } from "@/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "@/Hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AtSign, Phone, UserRound } from "lucide-react";
import { ButtonWithLoader, InputWithIcon } from "@/Components/UI";

const schema = z.object({
  fullName: z.string().min(1, { message: "First name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
});

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const { registerUser, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {

    registerUser(data.fullName, data.email, data.phone);
  };

  return (
    <>
      <AuthLayout
        title="Hello, chief! ⚡"
        description="Enter your details to create an account"
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputWithIcon
            label="Full Name"
            icon={<UserRound size={20} />}
            placeholder="e.g John Doe"
            type="text"
            {...register("fullName")}
            error={errors.fullName && errors?.fullName.message}
          />

          <InputWithIcon
            icon={<AtSign size={20} />}
            label="Email address"
            placeholder="e.g johndoe@mail.com"
            type="email"
            {...register("email")}
            error={errors.email && errors?.email.message}
          />
          <InputWithIcon
            icon={<Phone size={20} />}
            label="Phone Number"
            placeholder="08022223333"
            type="tel"
            {...register("phone")}
            error={errors.phone && errors?.phone.message}
          />

          <div className="space-y-2 mt-6">
            <ButtonWithLoader
              loading={isLoading}
              initialText="Register"
              loadingText="Registering..."
              className="bg-primary h-11 w-full text-sm font-medium text-white rounded-full"
            />
            <p className="text-center text-sm text-gray-500">- Or -</p>
            <Link
              to="/login"
              className="btn bg-primary/10 text-primary font-medium h-11 rounded-full text-sm"
            >
              {" "}
              I have an Account
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default Signup;
