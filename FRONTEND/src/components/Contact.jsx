import React from 'react';

const Contact = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-sky-800 to-indigo-900 py-16 px-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-xl text-white">
        <h2 className="text-4xl font-bold text-center mb-10">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Info Panel */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Let's connect!</h3>
            <p className="text-sm text-white/80">
              Got a question, suggestion, or want to collaborate? Fill out the form or reach out directly.
            </p>
            <div className="space-y-4 text-sm">
              <p>
                📧 <span className="font-semibold">Email:</span> diagnosisai@iitg.ac.in
              </p>
              <p>
                📞 <span className="font-semibold">Phone:</span> +91 9354071155
              </p>
              <p>
                📍 <span className="font-semibold">Location:</span> Gaurang Hostel, IIT Guwahati, Assam
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <form className="space-y-6">
            <div className="relative">
              
            </div>

            <div className="relative">
              
            </div>

            <div className="relative">
             
            </div>

            
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
