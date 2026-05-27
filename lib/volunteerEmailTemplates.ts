export type EmailTemplate = {
  subject: string;
  body: string;
};

export const VOLUNTEER_EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  "Cooking / Prasad Preparation": {
    subject: "SSTGH Volunteer Coordination — Cooking & Prasad Preparation",
    body: `Dear Volunteer,

Thank you for signing up to help with Cooking & Prasad Preparation at Sri Satyanarayana Temple of Greater Houston. Your seva is deeply appreciated by our temple community.

Here are the details for our upcoming session:

Date: [DATE]
Time: [TIME]
Location: Temple Kitchen
What to bring: [ITEMS / INGREDIENTS]
What we will be doing: Preparing prasad and food offerings for the puja ceremony.

Please arrive a few minutes early so we can get started on time. Let us know if you have any dietary restrictions or questions.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },

  "Event Setup & Cleanup": {
    subject: "SSTGH Volunteer Coordination — Event Setup & Cleanup",
    body: `Dear Volunteer,

Thank you for signing up to help with Event Setup & Cleanup at Sri Satyanarayana Temple of Greater Houston. Your seva makes our events possible.

Here are the details for our upcoming event:

Date: [DATE]
Time: [TIME]
Location: [HALL / AREA]
What we will be doing: Setting up seating, decorations, and supplies before the event, and cleaning up afterward.

Please wear comfortable clothing. All materials will be provided.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },

  "Cultural Programs": {
    subject: "SSTGH Volunteer Coordination — Cultural Programs",
    body: `Dear Volunteer,

Thank you for signing up to help with Cultural Programs at Sri Satyanarayana Temple of Greater Houston. Your talents help us celebrate our heritage and traditions.

Here are the details for our upcoming program:

Date: [DATE]
Time: [TIME]
Location: [HALL / STAGE AREA]
What we will be doing: [PROGRAM DETAILS — dance, music, drama, etc.]
Rehearsal schedule: [IF APPLICABLE]

Please bring any costumes or instruments needed for your performance. Contact us if you have any questions.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },

  "Children's Education": {
    subject: "SSTGH Volunteer Coordination — Children's Education",
    body: `Dear Volunteer,

Thank you for signing up to help with Children's Education at Sri Satyanarayana Temple of Greater Houston. Your dedication to the next generation is truly valued.

Here are the details for our upcoming session:

Date: [DATE]
Time: [TIME]
Location: [CLASSROOM / AREA]
Age group: [AGE RANGE]
What we will be doing: [LESSON TOPIC — slokas, stories, crafts, etc.]
Materials needed: [LIST IF ANY]

Please arrive a few minutes early to set up. Let us know if you need any teaching materials in advance.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },

  "Website & Social Media": {
    subject: "SSTGH Volunteer Coordination — Website & Social Media",
    body: `Dear Volunteer,

Thank you for signing up to help with Website & Social Media at Sri Satyanarayana Temple of Greater Houston. Your skills help us reach our community.

Here are the details for our upcoming task:

Date: [DATE]
Time: [TIME]
Meeting location: [IN-PERSON / VIRTUAL LINK]
What we will be doing: [TASK — content creation, photography, website updates, etc.]
Access / accounts: [ANY LOGIN DETAILS TO SHARE SEPARATELY]

Please come prepared with your device and any tools you typically use. We look forward to working with you.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },

  "Music & Devotional Singing": {
    subject: "SSTGH Volunteer Coordination — Music & Devotional Singing",
    body: `Dear Volunteer,

Thank you for signing up to help with Music & Devotional Singing at Sri Satyanarayana Temple of Greater Houston. Your voice and talent bring joy to our community.

Here are the details for our upcoming session:

Date: [DATE]
Time: [TIME]
Location: [HALL / TEMPLE AREA]
What we will be doing: [BHAJANS / AARTI / SPECIAL PERFORMANCE]
Rehearsal: [IF APPLICABLE — date and time]
Please bring: [INSTRUMENTS / SONG SHEETS]

We look forward to making beautiful music together in devotion.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },

  "Outreach & Community Service": {
    subject: "SSTGH Volunteer Coordination — Outreach & Community Service",
    body: `Dear Volunteer,

Thank you for signing up to help with Outreach & Community Service at Sri Satyanarayana Temple of Greater Houston. Your service strengthens our connection with the broader community.

Here are the details for our upcoming outreach:

Date: [DATE]
Time: [TIME]
Meeting location: [TEMPLE / OFFSITE LOCATION]
What we will be doing: [ACTIVITY — food drive, community event, charity, etc.]
What to bring: [ITEMS IF ANY]

Please dress comfortably and be ready to represent our temple with kindness and professionalism.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },

  "General Volunteering": {
    subject: "SSTGH Volunteer Coordination — General Volunteering",
    body: `Dear Volunteer,

Thank you for signing up to volunteer at Sri Satyanarayana Temple of Greater Houston. We are grateful for your willingness to serve in any capacity needed.

Here are the details for our upcoming opportunity:

Date: [DATE]
Time: [TIME]
Location: [AREA OF THE TEMPLE]
What we will be doing: [TASK DESCRIPTION]
What to bring: [IF ANYTHING]

Your flexibility and dedication mean a great deal to our community. We will have a coordinator on-site to guide you when you arrive.

With gratitude,
SSTGH Volunteer Coordination
Sri Satyanarayana Temple of Greater Houston
24801 Botkins Road, Hockley, TX 77447
Info@sstgh.org`,
  },
};
