document.addEventListener("DOMContentLoaded", () => {
  // Quote form handler
  const quoteForm = document.querySelector(".bg-primary form");
  if (quoteForm) {
    quoteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = quoteForm.querySelector('input[placeholder="Your Name"]').value;
      const email = quoteForm.querySelector('input[placeholder="Your Email"]').value;
      const service = quoteForm.querySelector("select")?.value || "";
      const data = { name, email, service };

      const res = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        alert("Quote submitted!");
        quoteForm.reset();
      } else {
        alert(json.error || "Failed to submit quote");
      }
    });
  }

  // Newsletter handler
  const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newsletterInput = newsletterForm.querySelector('input[placeholder="Your Email Address"]');
    const email = newsletterInput.value.trim();
    if (!email) return alert("Please enter email");

    try {
      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      console.log("Newsletter response:", json);
      if (res.ok) {
        alert("Subscribed to newsletter!");
        newsletterInput.value = "";
      } else {
        alert(json.error || "Failed to subscribe");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      alert("Network error");
    }
  });
}

  // Tracking handler
  const trackingSection = document.querySelector('.jumbotron .input-group');
  if (trackingSection) {
    const trackingInput = trackingSection.querySelector('input[placeholder="Tracking Id"]');
    const trackingBtn = trackingSection.querySelector('button');

    trackingBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const trackingId = trackingInput.value.trim();
      if (!trackingId) return alert("Please enter a Tracking ID");

      try {
        const res = await fetch("http://localhost:5000/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trackingId }),
        });
        const json = await res.json();
        console.log("Tracking response:", json);
        if (res.ok) {
          alert(`Status: ${json.data.status}\nLocation: ${json.data.lastLocation}\nETA: ${new Date(json.data.estimatedDelivery).toDateString()}`);
        } else {
          alert(json.error || "Tracking failed");
        }
      } catch (err) {
        console.error("Tracking error:", err);
        alert("Network error");
      }
    });
  }
});

//order handler

document.addEventListener("DOMContentLoaded", () => {
  const orderButtons = document.querySelectorAll(".order-btn");

  orderButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const plan = btn.getAttribute("data-plan");
      const email = prompt("Enter your email to order " + plan + " plan:");
      const name = prompt("Enter your name:");

      if (!email) return alert("Email is required");

      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan, email, name }),
        });
        const json = await res.json();
        if (res.ok) {
          alert("Order placed successfully! Order ID: " + json.orderId);
        } else {
          alert(json.error || "Order failed");
        }
      } catch (err) {
        console.error("Order error:", err);
        alert("Network error");
      }
    });
  });
});

//contact handler 
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !subject || !message) {
        return alert("All fields are required!");
      }

      try {
        const res = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const json = await res.json();
        if (res.ok) {
          alert(json.message);
          contactForm.reset();
        } else {
          alert(json.error || "Failed to send message");
        }
      } catch (err) {
        console.error("Contact error:", err);
        alert("Network error");
      }
    });
  }
});



  

