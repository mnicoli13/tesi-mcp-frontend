export type QuickAction = {
  label: string;
  value: string;
};

export const quickActions: QuickAction[] = [
  {
    label: "What tools are available?",
    value:
      "Please provide me with a comprehensive list of all available tools in the system. For each tool, I would like to know its name, a detailed description of what it does, what input parameters it accepts, and what kind of output or results it produces. This will help me understand how I can best utilize the available functionality.",
  },
  {
    label: "Generate cv based on my profile",
    value:
      "I would like to generate a professional CV in Europass format using the information from my student profile, you can recover it from my bearer token. Please retrieve my academic data including my personal information, educational background, exam results, acquired skills, and any relevant coursework. Format all this information according to the Europass CV standard template, ensuring all sections are properly filled out and professionally presented.",
  },
  {
    label: "Extract skills from my exams",
    value:
      "Please analyze my complete exam history and extract the most relevant skills I have acquired during my studies. For each skill identified, provide the skill name, a measure of proficiency or confidence based on my exam performance, grades, and ECTS credits, and a brief description explaining how this skill relates to my coursework. Present the top 15 most significant skills ranked by relevance and proficiency level. You can recover my academic data from my bearer token.",
  },
  {
    label: "Suggest career job roles based on my exams",
    value:
      "Based on my academic background, exam results, and the skills I have acquired throughout my studies, please suggest suitable career paths and job roles that would be a good match for my profile. For each suggested role, include the job title, a description of the role's responsibilities, why it matches my skill set and academic background, and what additional skills or qualifications might be beneficial. Focus on roles that align well with my demonstrated competencies and educational achievements. You can recover my academic data from my bearer token.",
  },
  {
    label: "Find jobs as developer near Bergamo",
    value:
      "Please search for available developer job positions in the Bergamo area, Italy. I'm looking for software development roles that match my technical skills and academic background. For each job listing found, provide the job title, company name, location details, whether remote work is available, a description of the role and its requirements, salary information if available, the posting date, and a link to apply. Focus on entry-level to mid-level positions suitable for recent graduates or early-career developers.",
  },
];
