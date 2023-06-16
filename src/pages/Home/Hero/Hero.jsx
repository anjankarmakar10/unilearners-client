import React from "react";
import HeroSlide from "./HeroSlide";

const Hero = () => {
  return (
    <div>
      <div className="carousel w-full hero-h">
        <div id="slide1" className="carousel-item relative w-full">
          <HeroSlide
            title={"Master a New Language"}
            info={
              "Discover the joy of learning a new language with our comprehensive courses. From beginner to advanced levels, we have everything you need to become fluent in your chosen language"
            }
            bg={
              "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            }
          />
          <div className="absolute  bottom-4 right-4 gap-4 hidden md:flex ">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <HeroSlide
            title={"Connect with Language Enthusiasts"}
            info={
              "Join a vibrant community of language learners from around the world. Engage in discussions, practice conversations, and make friends with fellow enthusiasts who share your passion for language and culture"
            }
            bg={
              "https://www.teachermagazine.com/assets/images/teacher/_articleimagetransform855x313/Principals_joining_staff_PD.jpg"
            }
          />
          <div className="absolute  bottom-4 right-4 gap-4 hidden md:flex">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <HeroSlide
            title={"Personalized Learning Experience"}
            info={
              "Tailor your language learning journey according to your pace and preferences. Our adaptive platform offers personalized lessons, practice exercises, and feedback, ensuring effective and efficient progress"
            }
            bg={
              "https://imageio.forbes.com/specials-images/imageserve/5fc5545f851237f27b13a0db/0x0.jpg?format=jpg&crop=7952,4476,x0,y630,safe&width=1200"
            }
          />
          <div className="absolute  bottom-4 right-4 gap-4 hidden md:flex">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <HeroSlide
            title={"Explore Cultural Diversity"}
            info={
              "Immerse yourself in different cultures while learning a new language. Our interactive lessons not only teach you vocabulary and grammar but also provide insights into the rich traditions and customs of each language's native speakers."
            }
            bg={
              "https://www.graduateprogram.org/wp-content/uploads/2020/06/June-2-How-to-Manage-Your-Time-During-Online-Teaching-web.jpg"
            }
          />
          <div className="absolute  bottom-4 right-4 gap-4 hidden md:flex">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
