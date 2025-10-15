import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom-error";

export type DoctorInfoProps = {
	doctorId: string;
	price: number;
	duration: number;
};

export class DoctorInfo {
	id: string;
	doctorId: string;
	price: number;
	duration: number;
	private constructor(props: DoctorInfoProps) {
		if (!props.doctorId) {
			throw new CustomError("Doctor does not exist");
		}

		if (props.duration <= 0) {
			throw new CustomError("Invalid duration");
		}

		(this.id = randomUUID()),
			(this.doctorId = props.doctorId),
			(this.price = props.price);
		this.duration = props.duration;
	}

	static create(data: DoctorInfoProps) {
		const doctorInfo = new DoctorInfo(data);
		return doctorInfo;
	}
}
