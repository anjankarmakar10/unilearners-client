import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="p-6 mt-10">
      <footer className="footer p-10  text-neutral-content rounded-lg bg-success-content">
        <div>
          <h2 className="">
            <a className="font-bold text-2xl md:text-3xl text-white">
              Uni<span className="text-[#1DBF73]">Learners</span>
            </a>
            <div className="mt-4">
              <h5 className="font-bold text-lg">Follow Us</h5>
              <div className="grid grid-flow-col  py-3">
                <a href="">
                  <BsTwitter size={24} />
                </a>
                <a href="">
                  <BsInstagram size={24} />
                </a>
                <a href="">
                  <BsLinkedin size={24} />
                </a>
                <a href="">
                  <BsFacebook size={24} />
                </a>
              </div>
            </div>
            <p className="mt-2">Copyright © 2023 - All right reserved</p>
          </h2>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Education</a>
          <a className="link link-hover">Online Courses</a>
          <a className="link link-hover">Online Classes</a>
          <a className="link link-hover">Offline Classes</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Locations</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
