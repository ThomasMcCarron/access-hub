import { ICategory } from '../model/category.model';

export const VISION: ICategory = {
  id: 1,
  name: 'Vision',
  description: 'Apps to assist people with vision impairments'
};

export const HEARING: ICategory = {
  id: 2,
  name: 'Hearing',
  description: 'Apps to assist people with hearing impairments'
};

export const AUTISM: ICategory = {
  id: 3,
  name: 'Autism',
  description: 'Apps designed to support individuals with autism spectrum disorders'
};

export const ADHD: ICategory = {
  id: 4,
  name: 'ADHD',
  description: 'Apps to help individuals manage ADHD (Attention Deficit Hyperactivity Disorder)'
};

export const MOBILITY: ICategory = {
  id: 5,
  name: 'Mobility',
  description: 'Apps to assist individuals with mobility challenges'
};

export const COGNITIVE: ICategory = {
  id: 6,
  name: 'Cognitive',
  description: 'Apps designed to aid people with cognitive disabilities or neurological impairments'
};

export const SPEECH: ICategory = {
  id: 7,
  name: 'Speech',
  description: 'Apps to support individuals with speech and communication difficulties'
};

export const MENTAL_HEALTH: ICategory = {
  id: 8,
  name: 'Mental Health',
  description: 'Apps focused on mental health support and well-being'
};

export const LEARNING: ICategory = {
  id: 9,
  name: 'Learning',
  description: 'Educational apps tailored for individuals with learning disabilities'
};

export const CATEGORIES = [
  VISION, HEARING, AUTISM, ADHD, MOBILITY, COGNITIVE, SPEECH, MENTAL_HEALTH, LEARNING
];
