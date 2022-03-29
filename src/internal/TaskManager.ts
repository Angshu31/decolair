export type Task<T> = (shareData: T) => any;

export default class TaskManager<T> {
  tasks: Map<number, Task<T>[]> = new Map();

  static init<T>(obj: any, initData: T) {
    const tm = new TaskManager<T>(obj, initData);
    Reflect.defineMetadata("tm", tm, obj);
    return tm;
  }

  static get<T>(obj: any, initData: T): TaskManager<T> {
    return Reflect.getMetadata("tm", obj) || TaskManager.init(obj, initData);
  }

  constructor(public obj: any, public sharedData: T) {}

  addTask(priority: number, task: Task<T>) {
    if (!this.tasks.has(priority)) {
      this.tasks.set(priority, []);
    }
    this.tasks.get(priority).push(task);
  }

  runTasks() {
    const keys = Array.from(this.tasks.keys()).sort();

    for (const key of keys) {
      const tasks = this.tasks.get(key);

      for (const task of tasks) {
        task(this.sharedData);
      }
    }
  }
}
