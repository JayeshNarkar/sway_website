import SocialsButtons from "@/components/contact-us/SocialsButtons";
import SupportForm from "@/components/contact-us/SupportForm";

function ContactUs() {
  return (
    <div className="flex justify-center content-center flex-col mt-[60px]">
      <div>
        <p className="text-center mt-4">
          Any Questions?
          <br /> Reach out to us at:
          <br /> <strong>Email:</strong> swayy.infoo@gmail.com
        </p>
      </div>
      <hr className="border-b border-gray-400 my-4" />
      <p className="text-center font-semibold text-xl mb-4">Contact Us</p>
      <SupportForm />
      <hr className="border-b border-gray-400 my-4" />
      <p className="text-center font-semibold text-xl mb-4">Socials</p>
      <SocialsButtons />
    </div>
  );
}

export default ContactUs;
