
export class Person {
  id: number;
  fullName: string;
  area: string;
  linkedin: string;
  location: string;
  companies: string[];
  favorite: boolean;

  constructor(
    id: number, 
    fullName: string, 
    area: string, 
    linkedin: string, 
    location: string, 
    companies: string[] = []
  ) {
    this.id = id;
    this.fullName = fullName;
    this.area = area;
    this.linkedin = linkedin;
    this.location = location;
    this.companies = companies;
    this.favorite = false;
  }

  toggleFavorite(): Person {
    this.favorite = !this.favorite;
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      fullName: this.fullName,
      area: this.area,
      linkedin: this.linkedin,
      location: this.location,
      companies: this.companies,
      favorite: this.favorite
    };
  }
}

// Sample data
export const samplePersons: Person[] = [
  new Person(1, "John Smith", "Investment", "/john_smith", "NYC, US", ["Optimum"]),
  new Person(2, "Jane Doe", "Investment", "/jane_doe", "NYC, US", ["Optimum"]),
  new Person(3, "Robert Johnson", "Investment", "/robert_johnson", "NYC, US", ["Optimum"]),
  new Person(4, "Lisa Brown", "Investment", "/lisa_brown", "NYC, US", ["Optimum"]),
  new Person(5, "Michael Wilson", "Investment", "/michael_wilson", "NYC, US", ["Optimum"]),
  new Person(6, "Sarah Davis", "Investment", "/sarah_davis", "NYC, US", ["Optimum"]),
  new Person(7, "David Miller", "Investment", "/david_miller", "NYC, US", ["Optimum"]),
  new Person(8, "Emily Wilson", "Investment", "/emily_wilson", "NYC, US", ["Optimum"]),
  new Person(9, "James Taylor", "Investment", "/james_taylor", "NYC, US", ["Optimum"])
];
