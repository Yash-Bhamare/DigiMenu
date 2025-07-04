
import axios from "axios";
import { useState } from "react";

function Contact() {

  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  function GetName(e) {

    setName(e.target.value)
  }
  function GetMail(e) {
    setMail(e.target.value)
  }

  function GetSubject(e) {
    setSubject(e.target.value)
  }

  function GetMessage(e) {
    setMessage(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const dt = {
      name: name,
      mail: mail,
      subject: subject,
      message: message
    };
    axios.post("http://localhost:3000/ContactUS",dt)
    .then(response=>{
    if (response.status===200) {
      alert("Your message has been sent. Thank you!");
         setName("");
         setMail("");
         setSubject("");
         setMessage("");
    }
    else 
    {
      alert("Failed to send message. Try again.");
    }
    })
    .catch(error => {
        console.error("Error sending message:", error);
        alert("An error occurred. Please try again.");
      });
}



  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <p><span>Need Help?</span> <span className="description-title">Contact Us</span></p>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="250">
        <form onSubmit={handleSubmit} className="php-email-form">
          <div className="row gy-4">
            <div className="col-md-6">
              <input type="text" name="uname" className="form-control" placeholder="Your Name" value={name}onChange={GetName} />
            </div>
            <div className="col-md-6">
              <input type="email" name="email" className="form-control" placeholder="Your Email" value={mail} onChange={GetMail} />
            </div>
            <div className="col-md-12">
              <input type="text" name="subject" className="form-control" placeholder="Subject" value={subject} onChange={GetSubject} />
            </div>
            <div className="col-md-12">
              <textarea name="message" className="form-control" rows="6" placeholder="Message" value={message} onChange={GetMessage}></textarea>
            </div>
            <div className="col-md-12 text-center">
              <button type="submit">Send Message</button>

            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
