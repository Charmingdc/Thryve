const validateJournal = async (title, content) => {
  if (title.trim() === '') return 'Journal title cannot be empty';
  if (content.trim() === '') return 'Journal content cannot be empty';
}


export default validateJournal;