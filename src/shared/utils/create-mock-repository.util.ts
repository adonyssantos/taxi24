export function createMockRepository<T>(mockData: Partial<T> = {}) {
  return {
    create: jest.fn().mockReturnValue(mockData),
    save: jest.fn().mockResolvedValue(mockData),
    find: jest.fn().mockResolvedValue([mockData]),
    findOneBy: jest.fn().mockResolvedValue(mockData),
    remove: jest.fn().mockResolvedValue(undefined),
  };
}
