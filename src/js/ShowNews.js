import { Service } from './Service';

export default (query) => {
  new Service()
    .LoadMainPage(query);
}

