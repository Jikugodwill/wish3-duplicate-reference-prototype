import type { Reference } from '../domain/types';

export const seedReferences: Reference[] = [
  {
    id: 'ref-001',
    title: 'Attention Is All You Need',
    authors: [
      'Ashish Vaswani',
      'Noam Shazeer',
      'Niki Parmar',
      'Jakob Uszkoreit',
    ],
    source: 'NeurIPS',
    year: 2017,
    doi: '10.48550/arXiv.1706.03762',
    url: 'https://arxiv.org/abs/1706.03762',
  },
  {
    id: 'ref-002',
    title: 'The C Programming Language (2nd Edition)',
    authors: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
    source: 'Prentice Hall',
    year: 1988,
    isbn: '978-0-13-110362-7',
  },
  {
    id: 'ref-003',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    source: 'NAACL',
    year: 2019,
    doi: 'https://doi.org/10.48550/arXiv.1810.04805',
    url: 'https://arxiv.org/abs/1810.04805?utm_source=newsletter',
  },
  {
    id: 'ref-004',
    title: 'Deep Learning',
    authors: ['Ian Goodfellow', 'Yoshua Bengio', 'Aaron Courville'],
    source: 'MIT Press',
    year: 2016,
    isbn: '0-262-03561-8',
    url: 'https://www.deeplearningbook.org/',
  },
  {
    id: 'ref-005',
    title: 'Wikipedia: Citing Sources',
    source: 'Wikipedia Help',
    year: 2024,
    url: 'https://en.wikipedia.org/wiki/Help:Citing_sources',
  },
  {
    id: 'ref-006',
    title: 'Nature Human Behaviour article example',
    source: 'Nature Human Behaviour',
    year: 2023,
    doi: 'doi:10.1038/s41562-023-01562-0',
    url: 'https://doi.org/10.1038/s41562-023-01562-0',
  },
];
