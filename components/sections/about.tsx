import Image from "next/image";

function About() {
  return (
    <div className="px-4 lg:mx-52 border-t border-dashed">
      <div className="py-10  text-center">
        <div className="font-semibold text-lg lg:text-xl text-gray-700 pb-2">
          About Yukimito
        </div>
        <div className="text-4xl lg:text-[64px] font-bold">
          <div className="text-secondary">The Standards</div>
          <div className="leading-tight">Are Higher Here</div>
        </div>
        <div className="mt-6 lg:mt-10 text-sm lg:text-base text-gray-600">
          Yukimito Pet Boarding & Hotel Service is a pet-friendly and
          professional service for the Illongos who are traveling outside of
          their homes and won’t be able to care for their furry loved ones.
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 my-10">
        {[
          {
            title: "Well-Trained Staff",
            description:
              "Our staff are highly trained to care for your pets, ensuring they are treated with love and professionalism while you are away.",
            imgSrc: "/svg/check.svg",
          },
          {
            title: "Meticulous About Meds & Vaccines",
            description:
              "We carefully monitor and manage your pet's medication and vaccines, providing peace of mind while they stay with us.",
            imgSrc: "/svg/check.svg",
          },
          {
            title: "Careful Attention to Individual Needs",
            description:
              "Each pet is unique, and we tailor our care to meet their individual needs, ensuring they are happy and comfortable during their stay.",
            imgSrc: "/svg/check.svg",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="w-full max-w-[300px] h-[350px] bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center justify-center py-6 bg-gray-100">
              <Image
                width={50}
                height={50}
                src={card.imgSrc}
                alt="check-icon"
              />
            </div>
            <div className="text-center text-[20px] lg:text-[24px] font-semibold mt-4 px-4">
              {card.title}
            </div>
            <div className="px-6 py-4 text-center text-sm lg:text-base text-gray-600 flex-grow">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
