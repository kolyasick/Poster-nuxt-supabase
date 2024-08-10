export default defineNuxtPlugin(() => {
    const formatDate = (dateStr: Date | undefined) => {
      const date = new Date(dateStr || new Date());
  
      const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
      ];
  
      let day = date.getUTCDate();
      let month = months[date.getUTCMonth()];
      let hours = date.getUTCHours() + 3;
      
      if (hours === 24) { 
        hours = 0; 
      }
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  
      return `${day} ${month} ${hours}:${minutes}`;
    };
  
    return {
      provide: {
        formatDate
      }
    };
  });
  