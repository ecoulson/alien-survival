import { Equatable } from "./equatable";
import { Id } from "./id";
import { Identifiable } from "./identifiable";
import { deepClone } from "./util/deep-clone";
import { deepFreeze } from "./util/deep-freeze";
import { Validatable } from "./validatable";

export abstract class Entity<T = {}>
    implements Equatable<Entity>, Identifiable, Validatable {
    private entityId: Id;
    protected props: T;

    constructor(props: T) {
        if (props === null || props === undefined) {
            throw new Error("Props of an entity can not be null or undefined");
        }
        this.entityId = new Id();
        this.props = deepClone(props) as T;
        this.validate();
    }

    id() {
        return this.entityId;
    }

    abstract validate(): void;

    equals(otherEntity: Entity) {
        return otherEntity.entityId.equals(this.entityId);
    }

    getProps() {
        return deepFreeze<T>(this.props);
    }
}
