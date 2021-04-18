class StorageWorker {
  saverequests = (filters) => {
    localStorage.setItem('filters', JSON.stringify(filters));
  };

  getFilters = () => {
    try {
      const filters = localStorage.getItem('filters');
      const parsedFilters = filters ? JSON.parse(filters) : [];
      return parsedFilters;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  saveRequests = (requests) => {
    localStorage.setItem('requests', JSON.stringify(requests));
  };

  getRequests = () => {
    try {
      const requests = localStorage.getItem('requests');
      const parsedRequests = requests ? JSON.parse(requests) : [];
      return parsedRequests;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}

const storageWorker = new StorageWorker();

export default storageWorker;