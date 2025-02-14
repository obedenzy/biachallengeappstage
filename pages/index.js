import Head from 'next/head';
import { useState, useEffect } from 'react';

function LandingPage() {
  const [fullNames, setFullNames] = useState([]);
  const [selectedFullName, setSelectedFullName] = useState('');
  const [answers, setAnswers] = useState({
    hydrationGoals: '',
    dietNutrition: '',
    studyRead: '',
    dailyProgressPhoto: '',
    mindfulnessPractice: '',
    abstinence: '',
    connectionNetworking: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(''); // To hold success/error messages

  useEffect(() => {
    const fetchFullNames = async () => {
      try {
        const response = await fetch('/api/participants');
        if (!response.ok) {
          throw new Error(`Failed to fetch participants: ${response.status}`);
        }
        const data = await response.json();
        setFullNames(data);
      } catch (error) {
        console.error('Error fetching participants:', error);
        // Optionally set an error state here to display to the user
      }
    };

    fetchFullNames();

    const updateDateTime = () => {
      const now = new Date();
      const etFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });
      setCurrentDateTime(etFormatter.format(now));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!selectedFullName) {
      errors.selectedFullName = 'Please select a full name.';
    }
    Object.keys(answers).forEach((key) => {
      if (answers[key] === '') {
        errors[key] = 'Please answer this question.';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.error('Form validation failed');
      return;
    }

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedFullName, answers }),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        setSubmitMessage(responseData.message); // Set success message
        setIsSubmitted(true);
        // Reset form fields
        setSelectedFullName('');
        setAnswers({
          hydrationGoals: '',
          dietNutrition: '',
          studyRead: '',
          dailyProgressPhoto: '',
          mindfulnessPractice: '',
          abstinence: '',
          connectionNetworking: ''
        });
        setFormErrors({});
      } else {
        const errorData = await response.json(); // Parse JSON response for error
        setSubmitMessage(errorData.error || 'An unknown error occurred.'); // Set error message
        setIsSubmitted(false); // Optionally keep form active or reset on error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('An error occurred while submitting the form.');
      setIsSubmitted(false);
    }
  };

    const handleInputChange = () => {
        setIsSubmitted(false);
        setSubmitMessage(''); // Clear any previous messages
    };

  const questions = [
    {
      label: 'Hydration Goals',
      name: 'hydrationGoals',
      description: 'Drink half your body weight in ounces of water daily to refresh and rejuvenate.'
    },
    {
      label: 'Diet & Nutrition',
      name: 'dietNutrition',
      description: 'Stick to a balanced diet with no cheat meals for 30 days. Discipline is your power.'
    },
    {
      label: 'Study & Read',
      name: 'studyRead',
      description: '30 minutes of BRRRR Invest Academy studies + 10 pages of personal growth or real estate reading daily.'
    },
    {
      label: 'Daily Progress Photo',
      name: 'dailyProgressPhoto',
      description: 'Capture your transformation to inspire yourself and others.'
    },
    {
      label: 'Mindfulness Practice',
      name: 'mindfulnessPractice',
      description: '10 minutes of meditation, journaling, or breathing exercises to center your mind.'
    },
    {
      label: 'Abstinence',
      name: 'abstinence',
      description: 'No alcohol or recreational drugs to clear the path for peak performance.'
    },
    {
      label: 'Connection & Networking',
      name: 'connectionNetworking',
      description: 'Engage with your accountability partner to stay motivated and build meaningful connections.'
    }
  ];

  return (
    <div className="container">
      <Head>
        <title>BIA GROWTH MINDSET TRANSFORMATIONAL CHALLENGE 2.0</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
      </Head>
      <h1 className="text-center mb-4">BIA GROWTH MINDSET TRANSFORMATIONAL CHALLENGE 2.0</h1>

      <div className="card mb-4">
        <div className="card-body">
          <img src={process.env.NEXT_PUBLIC_IMAGE_URL} alt="BIA Challenge 2.0" className="img-fluid" />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Kickstart February 2025 with Purpose: Detox, Cleanse, and Propel Yourself!</h2>
          <p>BRRRR Invest Academy invites you to elevate your journey and ignite transformational growth with Transformational Challenge 2.0. February is your month to detox and cleanse yourself—to purify your mind and body, your temple, and build a strong foundation for your future success in real estate investing through the BRRRR method. Are you ready to commit?</p>
          <p><strong>Here’s What You’ll Conquer Over the Next 30 Days:</strong></p>
          <ul>
            <li><strong>Daily Workouts:</strong> Commit to 30 minutes of exercise every day to energize your body.</li>
            <li><strong>Hydration Goals:</strong> Drink half your body weight in ounces of water daily to cleanse and rejuvenate.</li>
            <li><strong>Diet & Nutrition:</strong> Follow a balanced diet that aligns with your health goals—no cheat meals for 90 days. This discipline fuels your journey.</li>
            <li><strong>Study & Read:</strong> Dedicate 30 minutes to BRRRR Invest Academy studies and read 10 pages of self-improvement or real estate books daily to expand your mind.</li>
            <li><strong>Daily Progress Photo:</strong> Document your transformation daily to keep yourself inspired.</li>
            <li><strong>Mindfulness Practice:</strong> Spend 10 minutes in meditation, journaling, or breathing exercises to align your inner self with your goals.</li>
            <li><strong>Abstinence:</strong> Commit to no alcohol or recreational drugs, clearing the path for peak performance.</li>
            <li><strong>Connection & Networking:</strong> Engage with your accountability partner to build meaningful connections and stay motivated.</li>
            <li><strong>Consistency:</strong> Show up every day and hold yourself accountable from Day 1 to Day 30.</li>
          </ul>
          <p><strong>Why Join?</strong></p>
          <p>This month isn’t just a challenge—it’s your clean slate, your time to propel yourself into greatness. By detoxing and cleansing your mind and body, you’re laying a foundation of discipline, focus, and clarity that will supercharge your BRRRR investing journey.</p>
          <p>Your mind and body are your temple. Care for them, strengthen them, and unlock the power to achieve your goals.</p>
          <p>Are you ready to cleanse, build, and thrive? Join us in making February the month that transforms your future. The time to start is now!</p>
        </div>
      </div>
      <div className="text-center mb-3">
        <p className="fw-bold" style={{ color: 'red' }}>
          Current Date and Time (Pacific Time): {currentDateTime}
        </p>
      </div>
        {submitMessage && (
            <div
                className={`alert ${isSubmitted ? 'alert-success' : 'alert-danger'} text-center`}
                role="alert"
            >
                {submitMessage}
            </div>
        )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label question-label fw-bold">
            Select Full Name
          </label>
          <input
            type="text"
            className={`form-control ${formErrors.selectedFullName ? 'is-invalid' : ''}`}
            id="fullName"
            list="fullNameOptions"
            value={selectedFullName}
            onChange={(e) => {
              setSelectedFullName(e.target.value);
              setFormErrors({ ...formErrors, selectedFullName: '' });
                handleInputChange();
            }}
            placeholder="Type to search..."
          />
          <datalist id="fullNameOptions">
            {fullNames.map((fullName) => (
              <option key={fullName} value={fullName} />
            ))}
          </datalist>

          {formErrors.selectedFullName && (
            <div className="invalid-feedback">
              {formErrors.selectedFullName}
            </div>
          )}
        </div>
        {questions.map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label fw-bold question-label">{field.label}</label>
            <div className="question-description">
              {field.description}
            </div>
            <div className="d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  type="radio"
                  className={`form-check-input ${formErrors[field.name] ? 'is-invalid' : ''}`}
                  name={field.name}
                  id={`${field.name}Yes`}
                  value="yes"
                  checked={answers[field.name] === 'yes'}
                  onChange={(e) => {
                    setAnswers({ ...answers, [field.name]: e.target.value });
                    setFormErrors({ ...formErrors, [field.name]: '' });
                      handleInputChange();
                  }}
                />
                <label className="form-check-label radio-label" htmlFor={`${field.name}Yes`}>
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className={`form-check-input ${formErrors[field.name] ? 'is-invalid' : ''}`}
                  name={field.name}
                  id={`${field.name}No`}
                  value="no"
                  checked={answers[field.name] === 'no'}
                  onChange={(e) => {
                    setAnswers({ ...answers, [field.name]: e.target.value });
                    setFormErrors({ ...formErrors, [field.name]: '' });
                      handleInputChange();
                  }}
                />
                <label className="form-check-label radio-label" htmlFor={`${field.name}No`}>
                  No
                </label>
              </div>
            </div>
            {formErrors[field.name] && (
              <div className="invalid-feedback">{formErrors[field.name]}</div>
            )}
          </div>
        ))}
        <hr className="my-4" />
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
