# Placement Readiness Platform

This project is a full-stack application designed to help students assess their readiness for job placements, analyze their profile against company requirements, and receive personalized recommendations for improvement.

## Features

- **AI-Powered Analysis:** Analyze student profiles against company requirements using advanced algorithms.
- **Personalized Matching:** Match students with companies based on skills, eligibility, and profile strength.
- **Skills Gap Analysis:** Detailed comparison of student skills versus required skills for specific roles/companies.
- **Eligibility Criteria Check:** Verify if a student meets the basic requirements for applying to a company.
- **Personalized Recommendations:** Provide actionable steps and resources to improve match scores and readiness.
- **Interview Experiences:** Access interview experiences shared by previous candidates for specific companies (integration with external resources like GeeksforGeeks).
- **User Authentication:** Secure login and registration using Supabase.
- **Profile Management:** Persistence of student profile data.
- **Responsive UI:** Built with React, TypeScript, and Tailwind CSS using Shadcn UI components for a modern and adaptive interface.

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn UI
  - Framer Motion (for animations)
  - Lucide React (for icons)
- **Backend/Database:**
  - Supabase (for authentication and data management)
- **Build Tool:**
  - Vite

## Setup and Installation

Follow these steps to get the project running locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/OmMTelrandhe/Placify
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Set up Supabase:**

    - Create a new project on Supabase.
    - Set up your database schema (refer to `supabase-setup.sql` if provided in the repository).
    - Get your Supabase Project URL and `anon` public key from your Supabase project settings (`API` section).

4.  **Configure environment variables:**

    - Create a `.env` file in the root of the project.
    - Add your Supabase credentials:
      ```env
      VITE_SUPABASE_URL=YOUR_SUPABASE_URL
      VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
      ```
    - Add your gemini API key:
      ```env
      VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
      ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

6.  Open your browser and navigate to `http://localhost:5173` (or the port indicated by Vite).

## Usage

- Register or log in to the platform.
- Fill in your profile details, including academic information, skills, etc.
- The platform will analyze your profile and provide a readiness score and company match analysis.
- Explore skill gaps, eligibility criteria, personalized recommendations, and interview experiences for potential companies.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a Pull Request.
