import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    campaignObjective: "",
    productDescription: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [generatedBrand, setGeneratedBrand] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form and generate tweets
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to generate tweets");
      }

      // Display generated output
      setResult(result.data);
      setGeneratedBrand(formData.brandName);

      // Clear input fields
      setFormData({
        brandName: "",
        industry: "",
        campaignObjective: "",
        productDescription: "",
      });
    } catch (error) {
      console.error("Generation error:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>BrandVoice AI</h1>
          <p>Generate 10 on-brand tweets using AI</p>
        </header>

        {/* Input Form */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="brandName">Brand Name</label>

            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="e.g. Nike"
              value={formData.brandName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry / Category</label>

            <input
              type="text"
              id="industry"
              name="industry"
              placeholder="e.g. Sports & Fitness"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="campaignObjective">Campaign Objective</label>

            <select
              id="campaignObjective"
              name="campaignObjective"
              value={formData.campaignObjective}
              onChange={handleChange}
              required
            >
              <option value="">Select objective</option>
              <option value="Engagement">Engagement</option>
              <option value="Promotion">Promotion</option>
              <option value="Awareness">Awareness</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Product Description</label>

            <textarea
              id="productDescription"
              name="productDescription"
              placeholder="Describe your product or service..."
              rows="5"
              value={formData.productDescription}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Generating tweets..." : "Generate Tweets"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {/* Loading */}
        {loading && (
          <div className="loading">
            <p>AI is analyzing the brand and generating tweets...</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="results">
            <h2>
              {generatedBrand
                ? `${generatedBrand} — Generated Content`
                : "Generated Content"}
            </h2>
            {/* Brand Voice */}
            <section className="brand-voice">
              <h2>Brand Voice Analysis</h2>

              <div className="voice-item">
                <h3>Tone</h3>

                <div className="tags">
                  {result.brandVoice.tone.map((tone, index) => (
                    <span className="tag" key={index}>
                      {tone}
                    </span>
                  ))}
                </div>
              </div>

              <div className="voice-item">
                <h3>Target Audience</h3>
                <p>{result.brandVoice.targetAudience}</p>
              </div>

              <div className="voice-item">
                <h3>Content Themes</h3>

                <div className="tags">
                  {result.brandVoice.contentThemes.map((theme, index) => (
                    <span className="tag" key={index}>
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="voice-item">
                <h3>Communication Style</h3>
                <p>{result.brandVoice.communicationStyle}</p>
              </div>
            </section>

            {/* Tweets */}
            <section className="tweets-section">
              <h2>Generated Tweets</h2>

              <div className="tweets-grid">
                {result.tweets.map((tweet, index) => (
                  <div className="tweet-card" key={index}>
                    <div className="tweet-header">
                      <span>Tweet {index + 1}</span>

                      <span className="tweet-type">{tweet.type}</span>
                    </div>

                    <p>{tweet.text}</p>

                    <button
                      type="button"
                      className="copy-button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(tweet.text);

                        setCopiedIndex(index);

                        setTimeout(() => {
                          setCopiedIndex(null);
                        }, 1500);
                      }}
                    >
                      {copiedIndex === index ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
