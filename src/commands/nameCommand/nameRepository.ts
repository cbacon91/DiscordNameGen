import { NameArgs } from "./nameArgs";
import { GeneratedNames } from "./generatedNames";

export abstract class NameRepository {

  abstract async getNamesAsync(args: NameArgs): Promise<GeneratedNames>;

}
