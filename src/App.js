import React, { useState, useEffect } from 'react';
import {
  Linkedin,
  Github,
  Mail,
  Download,
  Code,
  Briefcase,
  Layers,
  Phone,
  MapPin,
  Loader2,
  Send,
  Link,
  Book,
  Moon,
  Sun,
  GraduationCap
} from 'lucide-react';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [activeSection, setActiveSection] = useState('about');

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'projects', 'skills', 'contact'];
      const offset = 150;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setActiveSection('contact');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop - offset;
          const elementBottom = elementTop + element.offsetHeight;

          if (window.scrollY >= elementTop && window.scrollY < elementBottom) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans antialiased min-h-screen transition-colors duration-500">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} toggleTheme={toggleTheme} theme={theme} />
      <main className="container mx-auto px-4 py-8">
        <HeroSection scrollToSection={scrollToSection} />
        <SkillsSection />        
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

// Navbar component for navigation and theme toggle
const Navbar = ({ activeSection, scrollToSection, toggleTheme, theme }) => (
  <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors duration-500">
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="#" className="font-bold text-xl text-gray-900 dark:text-gray-200">
      </a>
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex space-x-6 text-gray-600 dark:text-gray-400">
          <NavLink id="about" active={activeSection === 'about'} onClick={() => scrollToSection('about')}>About</NavLink>
          <NavLink id="skills" active={activeSection === 'skills'} onClick={() => scrollToSection('skills')}>Skills</NavLink>
          <NavLink id="experience" active={activeSection === 'experience'} onClick={() => scrollToSection('experience')}>Experience</NavLink>
          <NavLink id="projects" active={activeSection === 'projects'} onClick={() => scrollToSection('projects')}>Projects</NavLink>
          <NavLink id="education" active={activeSection === 'education'} onClick={() => scrollToSection('education')}>Education</NavLink>
          <NavLink id="contact" active={activeSection === 'contact'} onClick={() => scrollToSection('contact')}>Contact</NavLink>
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      <div className="md:hidden">
        {/* Mobile menu button could go here */}
      </div>
    </nav>
  </header>
);

// NavLink for the Navbar
const NavLink = ({ id, active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300 relative group
      ${active ? 'text-gray-900 dark:text-gray-200 font-semibold' : ''}`}
  >
    {children}
    <span
      className={`absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out
        ${active ? 'scale-x-100' : ''}`}
    ></span>
  </button>
);

// Hero section with personal info and social links
const HeroSection = ({ scrollToSection }) => {
  const socialLinks = {
    linkedin: "https://www.linkedin.com/in/ziauddin-sameer-chowdhury-549632147/",
    github: "https://github.com/ziasam",
    leetcode: "https://leetcode.com/u/ziasam0702/",
    email: "mailto:ziauddinsameer@gmail.com",
    phone: "tel:+8801521325457",
  };
  const phoneNumberDisplay = "+880 1521 325457";

  return (
    <section id="about" className="text-center py-20 bg-white dark:bg-gray-800 shadow-xl rounded-xl -mt-16 transition-colors duration-500">
      <div className="flex justify-center mb-6">
        <img
          src={`${process.env.PUBLIC_URL}/profile.png`}
          alt="Ziauddin Sameer Chowdhury"
          className="rounded-full w-36 h-36 border-4 border-gray-200 dark:border-gray-700 object-cover"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Ziauddin Sameer Chowdhury</h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">Senior Software Engineer</p>

      <div className="flex justify-center space-x-6 text-gray-500 dark:text-gray-400 mb-8">
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          <Linkedin size={28} />
        </a>
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300">
          <Github size={28} />
        </a>
        <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300">
          <Code size={28} />
        </a>
        <a href={socialLinks.email} aria-label="Email" className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
          <Mail size={28} />
        </a>
        {/* --- START: MODIFIED PHONE LINK --- */}
        <div className="relative group">
          <a href={socialLinks.phone} aria-label="Phone" className="hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300">
            <Phone size={28} />
          </a>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg
                 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {phoneNumberDisplay}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
          </div>
        </div>
        {/* --- END: MODIFIED PHONE LINK --- */}
      </div>

      <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-8 px-4 text-center">
        Experienced Software Engineer with 4 years in SAAS and Fintech industries. Skilled in building scalable solutions using .NET, Angular, MSSQL, and PostgreSQL.
        Proficient in designing RESTful APIs and crafting responsive UIs with a focus on performance and reliability.
        Strong foundation in both monolithic and microservices architecture.
        Committed to clean, maintainable code and agile (Scrum) practices.
        Enjoys solving complex problems in system design and backend optimization.
        Driven by quality, precision, and long-term value in every project.
      </p>

      <a
        href={`${process.env.PUBLIC_URL}/Resume_Ziauddin_Sameer_Chowdhury.pdf`}
        download="Resume_Ziauddin_Sameer_Chowdhury.pdf"
        className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-blue-500 transition-colors duration-300 transform hover:-translate-y-1"
      >
        <Download className="mr-2" size={20} /> Download Resume
      </a>
    </section>
  );
};

// Skills section
const SkillsSection = () => {
  const skills = {
    "Programming Languages": ["C#", "JAVA", "JavaScript", "TypeScript"],
    "Web Technologies": ["RESTful APIs", "Microservices", "HTML5"],
    "Frameworks": [".NET Core", "Spring Boot", "Angular", "ABP.IO"],
    "Programming Paradigms": ["OOP", "Functional Programming", "AOP"],
    "Databases": ["MySQL", "Microsoft SQL", "PostgreSQL", "Elastic Search", "SQLite"],
    "Other Tools": ["Git", "Linux", "Postman", "Docker"],
  };

  return (
    <section id="skills" className="py-20 bg-gray-100 rounded-xl dark:bg-gray-800 transition-colors duration-500">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Technical Skills</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {Object.entries(skills).map(([category, skillList], index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-500">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
              <Book className="mr-2 text-purple-600 dark:text-purple-400" size={20} />
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full shadow-inner"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Experience section
const ExperienceSection = () => {
  const experiences = [
    {
      company: "XpertSolvers Ltd, (Remote)",
      title: "Senior Software Engineer",
      duration: "September 2022 - present",
      details: [
        "Developed and maintained monolithic and microservice applications using .NET, following  clean architecture and solid principles.",
        "Designed and implemented RESTful APIs and backend services with a focus on scalability, performance optimization and maintainability.",
        "Utilized entity framework core for data access including LINQ optimization, migrations, database performance tuning and transactional consistency across SQL based databases.",
        "Built and integrated Angular based front-end applications ensuring responsive design, modular architecture and seamless API integration.",
        "Improved code quality and system reliability by proper code reviews and refactoring initiatives.",
        "Provided production support for live systems, performing root cause analysis, resolving high priority incidents and ensuring system reliability and uptime.",
        "Managed application deployment and release processes on Linux environments contributing to environment configuration and post deployment validation.",
        "Collaborated with product owners, QA and cross-functional teams to translate business requirements into technical solutions.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-100 rounded-xl dark:bg-gray-800 transition-colors duration-500">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Work Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-8 max-w-4xl mx-auto transition-colors duration-500">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center mb-2">
            <Briefcase className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
            {exp.title} at {exp.company}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">{exp.duration}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            {exp.details.map((detail, i) => (
              <li key={i} className="leading-relaxed">{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

// Projects section
const ProjectsSection = () => {
  const projects = [
    {
      name: "Convocation Management (Chittagong University) - 2025",
      details: [
        "Cut processing time 50% by automating PDF and spreadsheet generation for 40k+ records.",
        "Implemented email and SMS services delivering timely notifications to all registered users.",
        "Enhanced system scalability by deploying microservice modules supporting peak convocation traffic.",
      ],
      link: "https://app.convocation.cu.ac.bd/",
    },
    {
      name: "MediaCentrix",
      details: [
        "Ensured HIPAA compliance by implementing secure API endpoints.",
        "Increased query performance 45% through complex SQL optimizations and indexing strategies.",
        "Accelerated client onboarding by delivering requested enhancements before planned deadlines.",
      ],
      link: null,
    },
    {
      name: "ESS-AGRO",
      details: [
        "Engineered core API, UI, and database.",
        "Implemented complex data aggregation enabling accurate insights for agronomists and staff.",
        "Reduced manual workload 60% through automation of livestock data processing algorithms.",
      ],
      link: "https://essdev.xpertsolvers.com/",
    },
    {
      name: "DiscoverHub (SaaS Project)",
      details: [
        "Engineered multi-tenant API services supporting SaaS subscription and onboarding workflows.",
        "Improved analytics reporting accuracy through custom SQL functions and refactoring.",
        "Reduced bug rate 25% by writing clear API documentation for cross-team integration.",
      ],
      link: "https://cddportaldev.lbh.one/account/login",
    },
    {
      name: "CommEngine",
      details: [
        "Maintained critical API, UI, and database components ensuring consistent system uptime.",
        "Enhanced search relevance via optimized Elasticsearch query configurations.",
        "Delivered new requested features 30% faster through agile iteration improvements.",
      ],
      link: "https://commengine.xyz/",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <Layers className="mr-2 text-green-600 dark:text-green-400" size={20} />
                {project.name}
              </h3>
              {project.link && project.link !== "#" && project.link !== "" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link size={20} />
                </a>
              )}
            </div>
            {project.duration && <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{project.duration}</p>}
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              {project.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

// Education section
const EducationSection = () => {
  const education = [
    {
      institution: "Chittagong University of Engineering and Technology",
      degree: "B.Sc. in Computer Science and Engineering",
      duration: "2016-2021",
    },
    {
      institution: "Chittagong Engineering University School and College",
      degree: "Higher Secondary Certificate (HSC)",
      duration: "2013-2015",
    },
  ];

  return (
    <section id="education" className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Educational Background</h2>
      <div className="space-y-8 max-w-4xl mx-auto">
        {education.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg transition-colors duration-500">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center mb-2">
              <GraduationCap className="mr-3 text-purple-600 dark:text-purple-400" size={24} />
              {item.institution}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">{item.degree}</p>
            <p className="text-gray-500 dark:text-gray-400 text-md">{item.duration}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Function to handle API calls with exponential backoff for resilience
const callApiWithRetry = async (url, options, retries = 5, delay = 100) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      // Log the error for debugging but don't stop the loop
      console.error(`Attempt ${i + 1} failed: ${error.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
  }
  throw new Error('All retries failed to connect to the API.');
};

// Contact form component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    try {
      // Simulate API call to send the message
      console.log('Submitting form data:', formData);

      // --- Start of Gemini API call with retry logic ---
      const prompt = `Simulate a response from Ziauddin Sameer Chowdhury to a new message. The message is from a person with the name "${formData.name}", and their message is: "${formData.message}". Please craft a polite, professional, and friendly acknowledgment that the message has been received and they will respond shortly. The response should be concise.`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const result = await callApiWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      // --- End of Gemini API call with retry logic ---

      let generatedMessage = "Thank you for your message! I have received it and will get back to you shortly.";
      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        generatedMessage = result.candidates[0].content.parts[0].text;
      }

      setMessage(generatedMessage);
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsError(true);
      setMessage('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Get in Touch</h2>
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl transition-colors duration-500">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              _id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2" size={20} />
                Send Message
              </>
            )}
          </button>
        </form>
        {message && (
          <div
            className={`mt-6 p-4 rounded-md ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

// Footer component
const Footer = () => (
  <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 dark:text-gray-500 text-center py-6">
    <p>&copy; {new Date().getFullYear()} Ziauddin Sameer Chowdhury. All rights reserved.</p>
  </footer>
);

export default App;