import Image from "next/image";
import DashboardImg from "../../public/dashboard.png";

const Hero = () => {
  return (
    <>
      <section className="bg-white flex flex-col items-center justify-center">
        <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl capitalize">
              <span className="block mb-1">Manage your expense</span>
              <span>
                <strong className="text-primary"> Control</strong> your money
              </span>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Start Creating your budget and save ton of money
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <a
                className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                href="/dashboard"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        <Image
          src={DashboardImg}
          alt="dashbopard img"
          width={1000}
          height={500}
          className="my-10 border-2 shadow-2xl"
        />
      </section>
    </>
  );
};

export default Hero;
