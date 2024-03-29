import avatar1 from "../../assets/images/users/avatar-1.jpg"
import avatar2 from "../../assets/images/users/avatar-2.jpg"
import avatar3 from "../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../assets/images/users/avatar-4.jpg"
import avatar5 from "../../assets/images/users/avatar-5.jpg"
import avatar7 from "../../assets/images/users/avatar-7.jpg"
import avatar8 from "../../assets/images/users/avatar-8.jpg"

const users = [
  {
    id: 1,
    img: avatar2,
    name: "Simon Ryles",
    designation: "Full Stack Developer",
    color: "primary",
    email: "SimonRyles@minible.com",
    projects: "125",
    skills: [{ name: "Photoshop" }, { name: "illustrator" }],
  },
  {
    id: 2,   
    img: avatar3,
    name: "Marion Walker",
    designation: "Frontend Developer",
    email: "MarionWalker@minible.com",
    projects: "132",
    skills: [{ name: "Html" }, { name: "Css" }, { name: "2 + more" }],
  },
  {
    id: 3,   
    name: "Frederick White",
    designation: "UI/UX Designer",
    email: "FrederickWhite@minible.com",
    projects: "1112",
    skills: [{ name: "Php" }, { name: "Java" }, { name: "Python" }],
  },
  {
    id: 4,
    img: avatar4,
    name: "Shanon Marvin",
    designation: "Backend Developer",
    color: "success",
    email: "Shanon@minible.com",
    projects: "121",
    skills: [{ name: "Ruby" }, { name: "Php" }, { name: "2 + more" }],
  },
  {
    id: 5,   
    name: "Mark Jones",
    designation: "Frontend Developer",
    email: "MarkJones@minible.com",
    projects: "145",
    skills: [{ name: "Html" }, { name: "Css" }, { name: "2 + more" }],
  },
  {
    id: 6,
    img: avatar5,
    name: "Janice Morgan",
    designation: "Backend Developer",
    email: "JaniceMorgan@minible.com",
    projects: "136",
    skills: [{ name: "Photoshop" }, { name: "UI/UX Designer" }],
  },
  {
    id: 7,
    img: avatar7,
    name: "Patrick Petty",
    designation: "UI/UX Designer",
    color: "info",
    email: "PatrickPetty@minible.com",
    projects: "125",
    skills: [{ name: "Ruby" }, { name: "Php" }, { name: "2 + more" }],
  },
  {
    id: 8,  
    img: avatar8,
    name: "Marilyn Horton",
    designation: "Frontend Developer",
    color: "",
    email: "MarilynHorton@minible.com",
    projects: "136",
    skills: [{ name: "Php" }, { name: "Java" }, { name: "Python" }],
  },
]

const userProfile = {
  id: 1,
  name: "Cynthia Price",
  designation: "UI/UX Designer",
  img: avatar1,
  projectCount: 125,
  revenue: 1245,
  personalDetail:
    "Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.",
  phone: "(123) 123 1234",
  email: "cynthiaminible@gmail.com",
  location: "California, United States",
  experiences: [
    {
      id: 1,
      designation: "UI/UX Designer",
      timeDuration: "2019 - 2020",
      company: "Abc Company",
      description: "To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual"
    },
    {
      id: 2,
      designation: "Graphic Designer",
      timeDuration: "2017 - 2019",
      company: "xyz Company",
      description: "It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental"
    },
  ],
  projects: [
    {
      id: 1,
      name: "Brand Logo Design",
      startDate: "18 Jun, 2020",
      status: "Open",
      badge: "primary",
    },
    {
      id: 2,
      name: "HackUSU Admin",
      startDate: "06 Jun, 2020",
      status: "Open",
      badge: "primary",
    },
    {
      id: 3,
      name: "Chat app Design",
      startDate: "28 May, 2020",
      status: "Complete",
      badge: "success",
    },
    {
      id: 4,
      name: "HackUSU Landing",
      startDate: "13 May, 2020",
      status: "Complete",
      badge: "success",
    },
    {
      id: 5,
      name: "	Authentication Pages",
      startDate: "06 May, 2020	",
      status: "Complete",
      badge: "success",
    },
  ],
  userComments: [
    {
      id: 1,
      img: avatar2,
      name: "Brian",
      description:
        "If several languages coalesce, the grammar of the resulting language.",
      date: "5 hrs ago",
      childComment: [
        {
          id: 1,
          img: avatar5,
          name: "Henry",
          description:
            "Their separate existence is a myth. For science, music, sport, etc.",
          date: "1 hr ago",
        },
      ],
    },
    {
      id: 2,
      img: avatar4,
      name: "Denver",
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge",
      date: "2 hrs ago",
    },
    {
      id: 3,
      img: avatar1,
      name: "Neal",
      description:
        "Everyone realizes why a new common language would be desirable.",
      date: "3 hrs ago",
    },
  ]
}

export { users, userProfile }