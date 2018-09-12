import { NameArgs } from "./nameArgs";
import { GeneratedNames } from "./generatedNames";

export abstract class NameRepository {

  protected NEWLINE: string = '\r\n';
  
  abstract async getNamesAsync(args: NameArgs): Promise<GeneratedNames>;

}
