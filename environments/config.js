import development from './env.dev';
import production from './env.prod';

const env = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production;
    default:
      return development;
  }
};

export default env();
