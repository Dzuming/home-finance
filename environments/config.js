import development from './env.dev';
import production from './env.prod';
  
  const env = () => {
    switch (process.env.NODE_ENV) {
      case 'development':
        return development;
      case 'production':
        return production;
    }
  } 

  export default env();
