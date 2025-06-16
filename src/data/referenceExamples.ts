import { ReferenceExample } from '../types';

export const referenceExamples: ReferenceExample[] = [
  // Harvard Style Examples
  {
    id: '1',
    style: 'harvard',
    type: 'book',
    title: 'Book with Single Author',
    example: 'Smith, J. (2023). Understanding Psychology. 3rd edn. London: Academic Press.',
    explanation: 'Format: Author surname, Initial. (Year). Title in italics. Edition (if not first). Place of publication: Publisher.'
  },
  {
    id: '2',
    style: 'harvard',
    type: 'book',
    title: 'Book with Multiple Authors',
    example: 'Johnson, A., Williams, B. and Brown, C. (2022). Research Methods in Education. 2nd edn. New York: Learning Publications.',
    explanation: 'Use "and" before the last author. If more than three authors, use "et al." after the first author.'
  },
  {
    id: '3',
    style: 'harvard',
    type: 'journal',
    title: 'Journal Article',
    example: 'Davis, L. (2023). The impact of technology on learning outcomes. Journal of Educational Research, 45(2), pp. 123-145.',
    explanation: 'Format: Author surname, Initial. (Year). Article title. Journal Name in italics, Volume(Issue), pp. page range.'
  },
  {
    id: '4',
    style: 'harvard',
    type: 'website',
    title: 'Website with Author',
    example: 'Garcia, M. (2023). Study tips for university students. StudyHelp.com. Available at: https://www.studyhelp.com/tips (Accessed: 15 March 2023).',
    explanation: 'Include the access date for websites as content can change over time.'
  },

  // APA Style Examples
  {
    id: '5',
    style: 'apa',
    type: 'book',
    title: 'Book with Single Author',
    example: 'Smith, J. (2023). Understanding psychology (3rd ed.). Academic Press.',
    explanation: 'Format: Author, A. A. (Year). Title of work: Capital letter also for subtitle (Edition). Publisher.'
  },
  {
    id: '6',
    style: 'apa',
    type: 'book',
    title: 'Book with Multiple Authors',
    example: 'Johnson, A., Williams, B., & Brown, C. (2022). Research methods in education (2nd ed.). Learning Publications.',
    explanation: 'Use "&" before the last author in reference list. For 3+ authors, list all authors.'
  },
  {
    id: '7',
    style: 'apa',
    type: 'journal',
    title: 'Journal Article',
    example: 'Davis, L. (2023). The impact of technology on learning outcomes. Journal of Educational Research, 45(2), 123-145. https://doi.org/10.1234/jer.2023.45.2.123',
    explanation: 'Format: Author, A. A. (Year). Title of article. Title of Periodical, Volume(Issue), pages. DOI or URL'
  },
  {
    id: '8',
    style: 'apa',
    type: 'website',
    title: 'Website with Author',
    example: 'Garcia, M. (2023, March 10). Study tips for university students. StudyHelp. https://www.studyhelp.com/tips',
    explanation: 'Format: Author, A. A. (Year, Month Date). Title of page. Site Name. URL'
  },

  // MLA Style Examples
  {
    id: '9',
    style: 'mla',
    type: 'book',
    title: 'Book with Single Author',
    example: 'Smith, John. Understanding Psychology. 3rd ed., Academic Press, 2023.',
    explanation: 'Format: Author Last Name, First Name. Title of Book. Edition, Publisher, Publication Date.'
  },
  {
    id: '10',
    style: 'mla',
    type: 'book',
    title: 'Book with Multiple Authors',
    example: 'Johnson, Alice, et al. Research Methods in Education. 2nd ed., Learning Publications, 2022.',
    explanation: 'For 3+ authors, use "et al." after the first author\'s name.'
  },
  {
    id: '11',
    style: 'mla',
    type: 'journal',
    title: 'Journal Article',
    example: 'Davis, Linda. "The Impact of Technology on Learning Outcomes." Journal of Educational Research, vol. 45, no. 2, 2023, pp. 123-145.',
    explanation: 'Format: Author. "Article Title." Journal Title, vol. #, no. #, Date, pp. #-#.'
  },
  {
    id: '12',
    style: 'mla',
    type: 'website',
    title: 'Website with Author',
    example: 'Garcia, Maria. "Study Tips for University Students." StudyHelp, 10 Mar. 2023, www.studyhelp.com/tips.',
    explanation: 'Format: Author. "Title of Web Page." Website Name, Date, URL.'
  },

  // Chicago Style Examples
  {
    id: '13',
    style: 'chicago',
    type: 'book',
    title: 'Book with Single Author',
    example: 'Smith, John. Understanding Psychology. 3rd ed. London: Academic Press, 2023.',
    explanation: 'Format: Author Last Name, First Name. Title of Book. Edition. Place of Publication: Publisher, Year.'
  },
  {
    id: '14',
    style: 'chicago',
    type: 'book',
    title: 'Book with Multiple Authors',
    example: 'Johnson, Alice, Bob Williams, and Carol Brown. Research Methods in Education. 2nd ed. New York: Learning Publications, 2022.',
    explanation: 'List all authors in full. Use "and" before the last author.'
  },
  {
    id: '15',
    style: 'chicago',
    type: 'journal',
    title: 'Journal Article',
    example: 'Davis, Linda. "The Impact of Technology on Learning Outcomes." Journal of Educational Research 45, no. 2 (2023): 123-145.',
    explanation: 'Format: Author. "Article Title." Journal Title Volume, no. Issue (Year): pages.'
  },
  {
    id: '16',
    style: 'chicago',
    type: 'website',
    title: 'Website with Author',
    example: 'Garcia, Maria. "Study Tips for University Students." StudyHelp. March 10, 2023. https://www.studyhelp.com/tips.',
    explanation: 'Format: Author. "Page Title." Website Name. Date. URL.'
  },

  // Vancouver Style Examples
  {
    id: '17',
    style: 'vancouver',
    type: 'book',
    title: 'Book with Single Author',
    example: 'Smith J. Understanding psychology. 3rd ed. London: Academic Press; 2023.',
    explanation: 'Format: Author Initial. Title. Edition. Place: Publisher; Year.'
  },
  {
    id: '18',
    style: 'vancouver',
    type: 'book',
    title: 'Book with Multiple Authors',
    example: 'Johnson A, Williams B, Brown C. Research methods in education. 2nd ed. New York: Learning Publications; 2022.',
    explanation: 'List all authors with initials. Use commas between authors.'
  },
  {
    id: '19',
    style: 'vancouver',
    type: 'journal',
    title: 'Journal Article',
    example: 'Davis L. The impact of technology on learning outcomes. J Educ Res. 2023;45(2):123-45.',
    explanation: 'Format: Author Initial. Article title. Journal Title. Year;Volume(Issue):pages.'
  },
  {
    id: '20',
    style: 'vancouver',
    type: 'website',
    title: 'Website with Author',
    example: 'Garcia M. Study tips for university students [Internet]. StudyHelp; 2023 Mar 10 [cited 2023 Mar 15]. Available from: https://www.studyhelp.com/tips',
    explanation: 'Format: Author Initial. Title [Internet]. Website; Date [cited Date]. Available from: URL'
  }
];