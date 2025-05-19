import { useState } from "react"

export const Contact = () => {

const [result, setResult] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "3f9f9013-31e9-4d59-9e8e-d5a0e07fd21a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Unsuccessful Submission", data);
      setResult(data.message);
    }
  };


    return <div>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                <h1 className="text-5xl font-bold font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-right pt-10 px-15">Contact Me</h1>
                <div className="card-body items-center">
                    
                    <form onSubmit={onSubmit}>
                        <fieldset className="fieldset">
                        <label className="label">Full Name</label>
                        <input type="text" className="input" placeholder="Name" name="name" required/>
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" name="email" required/>
                        <label className="label">Message</label>
                        <textarea class="textarea" placeholder="Message" name="message" required></textarea>
                        <button type="submit" className="btn btn-primary mt-4">Send</button>
                        </fieldset>
                    </form>
                    <span>{result}</span>
                </div>
                </div>
            </div>
        </div>
    </div>
}