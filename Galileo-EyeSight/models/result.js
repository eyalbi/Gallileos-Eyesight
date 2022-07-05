import moment from "moment";

class Result {
  constructor(id, imageUri, labelsNames, date ) {
    this.id = id;
    this.imageUri = imageUri;
    this.labelsNames = labelsNames;
    this.date = date;
  };

  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, HH:mm ');
  }
};

export default Result;